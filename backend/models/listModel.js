const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: [true, "List name is required"] }, 
  createdAt: { type: Date, default: Date.now, required: true },
  codes: [{ type: String, required: true }],
  images: [{ type: String, required: true }],
});

module.exports = mongoose.model("List", listSchema);
