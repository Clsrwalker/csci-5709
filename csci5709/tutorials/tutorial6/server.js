const crypto = require('node:crypto');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const {
  connectToDatabase,
  getUsersCollection,
  closeDatabaseConnection,
} = require('./db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

async function generateUniqueId(collection) {
  let id;
  let exists = true;

  while (exists) {
    id = crypto.randomBytes(4).toString('hex');

    exists = await collection.findOne({ id }, { projection: { _id: 1 } });
  }

  return id;
}

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Service is running' });
});

app.get('/users', async (req, res, next) => {
  try {
    const usersCollection = getUsersCollection();
    const users = await usersCollection.find({}, { projection: { _id: 0 } }).toArray();

    return res.status(200).json({
      message: 'Users retrieved',
      success: true,
      users,
    });
  } catch (error) {
    return next(error);
  }
});

app.get('/user/:id', async (req, res, next) => {
  try {
    const id = sanitizeString(req.params.id);
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'id is required',
      });
    }

    const usersCollection = getUsersCollection();
    const user = await usersCollection.findOne({ id }, { projection: { _id: 0 } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(error);
  }
});

app.post('/add', async (req, res, next) => {
  try {
    const email = sanitizeString(req.body.email);
    const firstName = sanitizeString(req.body.firstName);

    if (!email || !firstName) {
      return res.status(400).json({
        success: false,
        message: 'email and firstName are required',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    const usersCollection = getUsersCollection();
    const duplicate = await usersCollection.findOne(
      { email: { $regex: `^${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' } },
      { projection: { _id: 1 } },
    );

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    const id = await generateUniqueId(usersCollection);
    const newUser = {
      id,
      email,
      firstName,
    };

    await usersCollection.insertOne({ ...newUser });

    return res.status(201).json({
      message: 'User added',
      success: true,
      user: newUser,
    });
  } catch (error) {
    return next(error);
  }
});

app.put('/update/:id', async (req, res, next) => {
  try {
    const id = sanitizeString(req.params.id);
    const email = sanitizeString(req.body.email);
    const firstName = sanitizeString(req.body.firstName);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'id is required',
      });
    }

    if (!email && !firstName) {
      return res.status(400).json({
        success: false,
        message: 'At least one field (email or firstName) is required',
      });
    }

    if (email && !isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    const usersCollection = getUsersCollection();

    if (email) {
      const duplicate = await usersCollection.findOne(
        {
          id: { $ne: id },
          email: { $regex: `^${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' },
        },
        { projection: { _id: 1 } },
      );

      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists',
        });
      }
    }

    const updateFields = {};
    if (email) updateFields.email = email;
    if (firstName) updateFields.firstName = firstName;

    const result = await usersCollection.updateOne({ id }, { $set: updateFields });

    if (!result.matchedCount) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const updatedUser = await usersCollection.findOne({ id }, { projection: { _id: 0 } });

    return res.status(200).json({
      message: 'User updated',
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
});

app.delete('/delete/:id', async (req, res, next) => {
  try {
    const id = sanitizeString(req.params.id);

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'id is required',
      });
    }

    const usersCollection = getUsersCollection();
    const result = await usersCollection.deleteOne({ id });

    if (!result.deletedCount) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User deleted',
    });
  } catch (error) {
    return next(error);
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Tutorial 6 API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();

process.on('SIGINT', async () => {
  await closeDatabaseConnection();
  process.exit(0);
});
