const mongoose = require("mongoose");
const { Schema } = mongoose;

const KeeperBookingSchema = mongoose.Schema({
    keeper_id: { type: mongoose.Schema.Types.ObjectId, ref: "Keeper" },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
}, { timestamps: true });

const KeeperBooking = mongoose.model("KeeperBooking", KeeperBookingSchema);

// start_hour: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 23
//   },
//   start_minute: {
//     type: Number,
//     required: true,
//     min: 0,
//     max: 59
//   },