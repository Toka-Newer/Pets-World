const mongoose = require("mongoose");
const { Schema } = mongoose;

const vetBookingSchema = mongoose.Schema({
    vet_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vet", required: true },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "Owner", required: true },
    pet_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    day: { type: Date, required: true },
}, { timestamps: true });

const VetBooking = mongoose.model("VetBooking", vetBookingSchema);
