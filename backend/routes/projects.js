import express from "express";
import Project from "../models/project.model.js";

const router = express.Router();

// Example routes
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ message: "Project added!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
