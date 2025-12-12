import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  materials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material"
    }
  ],
  imageUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Project", projectSchema, "Projects");
