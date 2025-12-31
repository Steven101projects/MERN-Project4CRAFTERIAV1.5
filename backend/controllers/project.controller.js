import Project from "../models/projectModels.js";
import Material from "../models/materialModel.js";

/*
  GET all projects
*/
export async function getProjects(req, res) {
  try {
    const projects = await Project.find()
      .populate("materials")
      .populate("userId", "name email");

    res.json(projects);
  } catch {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
}

/*
  GET single project
*/
export async function getProject(req, res) {
  try {
    const project = await Project.findById(req.params.id)
      .populate("materials")
      .populate("comments.userId", "name");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch {
    res.status(400).json({ message: "Invalid project id" });
  }
}

/*
  CREATE project
*/
export async function createProject(req, res) {
  try {
    const {
      title,
      description,
      materials = [],
      imageUrl,
      steps = []
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const userId = req.user ? req.user._id : null;
    const createdBy = req.user ? req.user.name : "TheCreator";

    const project = new Project({
      title,
      description,
      materials,
      imageUrl,
      steps,
      userId,
      createdBy
    });

    const saved = await project.save();

    // sync materials
    if (materials.length > 0) {
      await Material.updateMany(
        { _id: { $in: materials } },
        { $addToSet: { projects: saved._id } }
      );
    }

    res.status(201).json(saved);
  } catch {
    res.status(500).json({ message: "Failed to create project" });
  }
}

/*
  UPDATE project
*/
export async function updateProject(req, res) {
  try {
    const { materials, userId, createdBy, ratings, comments, ...safeUpdates } =
      req.body;

    const existingProject = await Project.findById(req.params.id);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    const oldMaterials = existingProject.materials.map(id => id.toString());

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      {
        ...safeUpdates,
        materials
      },
      { new: true }
    ).populate("materials");

    if (!updated) {
      return res.status(404).json({ message: "Project not found" });
    }

    const newMaterials = (materials || []).map(id => id.toString());

    // remove project from materials no longer linked
    await Material.updateMany(
      { _id: { $in: oldMaterials.filter(id => !newMaterials.includes(id)) } },
      { $pull: { projects: updated._id } }
    );

    // add project to newly linked materials
    await Material.updateMany(
      { _id: { $in: newMaterials.filter(id => !oldMaterials.includes(id)) } },
      { $addToSet: { projects: updated._id } }
    );

    res.json(updated);
  } catch {
    res.status(400).json({ message: "Failed to update project" });
  }
}

/*
  DELETE project
*/
export async function deleteProject(req, res) {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // remove project from all linked materials
    await Material.updateMany(
      { _id: { $in: project.materials } },
      { $pull: { projects: project._id } }
    );

    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: "Project deleted successfully" });
  } catch {
    res.status(400).json({ message: "Failed to delete project" });
  }
}

/*
  ADD comment
*/
export async function addComment(req, res) {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.comments.push({
      userId: req.user?._id || null,
      username: req.user?.name || "Anonymous",
      text
    });

    await project.save();
    res.json(project.comments);
  } catch {
    res.status(400).json({ message: "Failed to add comment" });
  }
}

/*
  ADD rating
*/
export async function addRating(req, res) {
  try {
    const { value } = req.body;

    if (!value || value < 1 || value > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.ratings.push({
      userId: req.user?._id || null,
      value
    });

    await project.save();
    res.json(project.ratings);
  } catch {
    res.status(400).json({ message: "Failed to add rating" });
  }
}
