const mongoose = require("mongoose");
const { Schema } = mongoose;

const vetBookingSchema = mongoose.Schema({
    vet_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vet" },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },
    pet_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    day: { type: Date, required: true },
}, { timestamps: true });

const VetBooking = mongoose.model("VetBooking", vetBookingSchema);
