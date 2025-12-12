import Material from "../models/materialModel.js";

// get all materials
export async function getMaterials(req, res) {
  const items = await Material.find().populate("projects");
  res.json(items);
}

// get one material
export async function getMaterial(req, res) {
  const item = await Material.findById(req.params.id).populate("projects");
  res.json(item);
}
