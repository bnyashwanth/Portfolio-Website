// backend/models/education.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    year: { type: String, required: true },
}, {
    collection: 'Education' // Explicitly name the collection
});

const Education = mongoose.model('Education', educationSchema);

module.exports = Education;