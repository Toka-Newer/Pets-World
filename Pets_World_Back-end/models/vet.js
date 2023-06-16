const mongoose = require("mongoose");
const { Schema } = mongoose;

const VetSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    licence: {
      type: String,
      required: false,
      default: "Assets\\images\\anonymous.png",
    },
    experience: { type: Number, required: false, min: 0, default: 0 },
    cost: { type: Number, required: true, min: 10, default: 0 },
    description: { type: String, required: false },
    numberOfReviews: { type: Number, min: 0, default: 0 },
    totalOfReviews: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true }
);

const Vet = mongoose.model("Vet", VetSchema);
