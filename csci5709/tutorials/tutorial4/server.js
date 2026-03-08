const crypto = require('node:crypto');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const users = [
  { id: '5abf6783', firstName: 'ABC', email: 'abc@abc.ca' },
  { id: '5abf674563', firstName: 'XYZ', email: 'xyz@xyz.ca' },
];

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Service is running' });
});

app.get('/users', (req, res) => {
  res.status(200).json({
    message: 'Users retrieved',
    success: true,
    users,
  });
});

app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((item) => item.id === id);

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
});

app.post('/add', (req, res) => {
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

  const duplicate = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (duplicate) {
    return res.status(400).json({
      success: false,
      message: 'Email already exists',
    });
  }

  const newUser = {
    id: crypto.randomBytes(4).toString('hex'),
    email,
    firstName,
  };

  users.push(newUser);

  return res.status(201).json({
    message: 'User added',
    success: true,
    user: newUser,
  });
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    });
  }

  const email = sanitizeString(req.body.email);
  const firstName = sanitizeString(req.body.firstName);

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

  if (email) {
    const duplicate = users.find(
      (item) => item.id !== id && item.email.toLowerCase() === email.toLowerCase(),
    );

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    user.email = email;
  }

  if (firstName) {
    user.firstName = firstName;
  }

  return res.status(200).json({
    message: 'User updated',
    success: true,
    user,
  });
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

app.listen(PORT, () => {
  console.log(`Tutorial 4 API running on http://localhost:${PORT}`);
});