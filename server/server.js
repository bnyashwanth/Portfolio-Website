const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
if (uri) {
  mongoose.connect(uri);
  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log("✅ MongoDB database connection established successfully");
  });
} else {
  console.log("ℹ️ ATLAS_URI not found. Starting server without MongoDB connection.");
}

const projectsRouter = require('./routes/projects');
app.use('/projects', projectsRouter);

const educationRouter = require('./routes/education.js');
app.use('/education', educationRouter);

const chatRouter = require('./routes/chat.js');
app.use('/api/chat', chatRouter);

const githubRouter = require('./routes/github.js');
app.use('/api/github', githubRouter);


app.listen(port, () => {
    console.log(`🚀 Server is running on port: ${port}`);
});