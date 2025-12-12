import Project from "../models/projectModels.js";

// get all projects
export async function getProjects(req, res) {
  const items = await Project.find().populate("materials");
  res.json(items);
}

// get one project
export async function getProject(req, res) {
  const item = await Project.findById(req.params.id).populate("materials");
  res.json(item);
}
