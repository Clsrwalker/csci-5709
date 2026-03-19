Name: Xiang Li
Banner ID: B00876018
Course: CSCI 5709
Tutorial: Tutorial 6
Date Created: 19 Mar 2026
Last Modification Date: 19 Mar 2026

Repository (GitHub): https://github.com/Clsrwalker/csci-5709
Repository Path: https://github.com/Clsrwalker/csci-5709/tree/main/csci5709/tutorials/tutorial6
GitLab Mirror: https://git.cs.dal.ca/xiangl/csci-5709/-/tree/main/csci5709/tutorials/tutorial6?ref_type=heads
Deployment Link: https://csci-5709-t6.onrender.com/users

Overview:
Tutorial 6 implements a Node.js REST API connected to MongoDB Atlas.
The API supports create, read all, read by id, update, and delete operations for users.

Tech Stack:
- Node.js
- Express.js
- MongoDB Atlas 
- dotenv

API Endpoints:
- GET /health
- GET /users
- GET /user/:id
- POST /add
- PUT /update/:id
- DELETE /delete/:id

Example Request Bodies:
POST /add
{
  "email": "newuser@dal.ca",
  "firstName": "New"
}

PUT /update/:id
{
  "email": "updated@dal.ca",
  "firstName": "Updated"
}

Local Run Instructions:
1) Create a .env file based on .env.example
2) npm install
3) npm start
4) Test APIs at http://localhost:3000

Code References:
- Express routing:
  https://expressjs.com/en/guide/routing.html
- MongoDB Node.js driver patterns adapted from official MongoDB docs:
  https://www.mongodb.com/docs/drivers/node/current/



Artificial Intelligence Tools Used:
- chatgpt was used to drafting documentation
  All generated code was reviewed and modified before use.
