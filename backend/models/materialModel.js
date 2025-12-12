import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project"
    }
  ],
  createdAt: { type: Date, default: Date.now },
  popular: Number,
  type: String
});

export default mongoose.model("Material", materialSchema, "Materials");
