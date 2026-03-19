const { MongoClient } = require('mongodb');

let client;
let usersCollection;

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is required');
  }

  const dbName = process.env.DB_NAME || 'tutorial6_db';
  const collectionName = process.env.COLLECTION_NAME || 'users';

  client = new MongoClient(uri);
  await client.connect();

  const db = client.db(dbName);
  usersCollection = db.collection(collectionName);
}

function getUsersCollection() {
  if (!usersCollection) {
    throw new Error('Database connection has not been initialized');
  }

  return usersCollection;
}

async function closeDatabaseConnection() {
  if (client) {
    await client.close();
  }
}

module.exports = {
  connectToDatabase,
  getUsersCollection,
  closeDatabaseConnection,
};
