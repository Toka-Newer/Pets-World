const mongoose = require("mongoose");
const { Schema } = mongoose;

const vetBookingSchema = mongoose.Schema(
  {
    vetAppointment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VetAppointments",
    },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },
    pet_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const VetBooking = mongoose.model("VetBooking", vetBookingSchema);
