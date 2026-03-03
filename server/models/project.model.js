const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// backend/models/project.model.js - CORRECTED VERSION

const projectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    technologies: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
}, {
    timestamps: true,
    collection: 'Project' // <-- ADD THIS LINE
});

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;

// backend/models/project.model.js - CORRECTED VERSION

