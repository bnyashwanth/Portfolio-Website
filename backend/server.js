const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// chnaged the file name from Server.js to server.js due to case sensitivity issue
require('dotenv').config();
// corrected the server.js file name to Server.js
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("✅ MongoDB database connection established successfully");
})

const projectsRouter = require('./routes/projects.js');
app.use('/projects', projectsRouter);




app.listen(port, () => {
    console.log(`🚀 Server is running on port: ${port}`);
});