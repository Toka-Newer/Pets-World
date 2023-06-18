const mongoose = require("mongoose");
const { Schema } = mongoose;

const OwnerSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isKeeper: { type: Boolean, required: false, default: false },
    pets: [
        {
            pet_id: { type: mongoose.Schema.Types.ObjectId, ref: "Pets", required: true },
        },
    ],
    vetRating: [
        {
            vet_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vet", required: true },
            rate: { type: Number, max: 5 },
        },
    ],
    keeperRating: [
        {
            keeper_id: { type: mongoose.Schema.Types.ObjectId, ref: "Keeper", required: true },
            rate: { type: Number, max: 5 },
        },
    ],
}, { timestamps: true });

const Owner = mongoose.model("Owner", OwnerSchema);
