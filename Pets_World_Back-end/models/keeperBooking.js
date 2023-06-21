const mongoose = require("mongoose");
const { Schema } = mongoose;

const KeeperBookingSchema = mongoose.Schema(
  {
    appointment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KeeperAppointments",
      required: true,
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
    pet_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pets",
      required: true,
    },
  },
  { timestamps: true }
);

const KeeperBooking = mongoose.model("KeeperBooking", KeeperBookingSchema);
