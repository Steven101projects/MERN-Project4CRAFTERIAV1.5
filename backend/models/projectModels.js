import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  username: {
    type: String,
    default: "Anonymous"
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ratingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  value: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  }
});

const stepSchema = new mongoose.Schema({
  title: String,
  description: {
    type: String,
    required: true
  }
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  },

  createdBy: {
    type: String,
    default: "TheCreator"
  },

  materials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material"
    }
  ],

  steps: [stepSchema],

  ratings: [ratingSchema],

  comments: [commentSchema],

  imageUrl: String,

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Project", projectSchema, "Projects");
