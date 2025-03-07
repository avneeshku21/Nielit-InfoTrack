import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  course: { type: String, required: true },
  batch: { type: String, required: true },
  grade: { type: Number, required: true, min: 0, max: 100 },
});

export default mongoose.model("Result", resultSchema);