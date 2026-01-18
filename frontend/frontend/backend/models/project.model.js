import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    technologies: [{ type: String }],
    liveUrl: { type: String },
    githubUrl: { type: String },
  },
  {
    timestamps: true,
    collection: "Project", // explicitly name collection
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
