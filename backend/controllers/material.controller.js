import Material from "../models/materialModel.js";

// get all materials
export async function getMaterials(req, res) {
  try {
    const items = await Material.find().populate("projects");
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to load materials" });
  }
}

// get one material
export async function getMaterial(req, res) {
  try {
    const item = await Material.findById(req.params.id).populate("projects");

    if (!item) {
      return res.status(404).json({ message: "Material not found" });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Failed to load material" });
  }
}

// update material (add project reference)
export async function updateMaterial(req, res) {
  const { id } = req.params;
  const { projectId } = req.body;

  if (!projectId) {
    return res.status(400).json({ message: "projectId is required" });
  }

  try {
    const material = await Material.findById(id);

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    // avoid duplicates
    if (!material.projects.includes(projectId)) {
      material.projects.push(projectId);
      await material.save();
    }

    const updatedMaterial = await Material
      .findById(id)
      .populate("projects");

    res.json(updatedMaterial);
  } catch (err) {
    res.status(500).json({ message: "Failed to update material" });
  }
}

export async function addMaterial(req, res) {
  const { name, description, type, popular } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Material name is required" });
  }

  try {
    // prevent duplicate material names
    const existing = await Material.findOne({
      name: name.trim()
    });

    if (existing) {
      return res.status(409).json({ message: "Material already exists" });
    }

    const material = new Material({
      name: name.trim(),
      description: description || "",
      type: type || "",
      popular: popular || 0,
      projects: []
    });

    await material.save();

    res.status(201).json(material);
  } catch (err) {
    res.status(500).json({ message: "Failed to add material" });
  }
}

