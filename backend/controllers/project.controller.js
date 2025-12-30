import Project from "../models/projectModels.js";

// get all projects
export async function getProjects(req, res) {
  try {
    const items = await Project.find()
      .populate("materials")
      .populate("userId", "name email");

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
}


// get one project
export async function getProject(req, res) {
  try {
    const item = await Project.findById(req.params.id).populate("materials");

    if (!item) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(item);
  } catch (err) {
    res.status(400).json({ message: "Invalid project id" });
  }
}

// create project
export async function createProject(req, res) {
  try {
    const { title, description, materials, imageUrl } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const userId = req.user ? req.user._id : null;
    const createdBy = req.user ? req.user.name : "TheCreator";

    const newProject = new Project({
      title,
      description,
      materials,
      imageUrl,
      userId,
      createdBy
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ message: "Failed to create project" });
  }
}

export async function updateProject(req, res) {
  try {
    // block creator fields from being updated
    const { userId, createdBy, ...safeUpdates } = req.body;

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      safeUpdates,
      { new: true }
    ).populate("materials");

    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update project" });
  }
}

// delete project
export async function deleteProject(req, res) {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete project" });
  }
}
