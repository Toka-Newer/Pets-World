const mongoose = require("mongoose");
const { Schema } = mongoose;

const OwnerSchema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isKeeper: { type: Boolean, required: false, default: false },
    pets: [
        {
            name: { type: String, required: true },
            type: {
                type: String,
                required: true,
                enum: ["dog", "cat", "bird", "turtle"],
            },
            gender: {
                type: String,
                required: true,
                enum: ["male", "female"],
            },
            dateOfBirth: { type: Date, required: false },
            age: { type: Number, required: true },
            description: { type: String, required: false, default: "" },
            image: { type: String, required: false, default: "Assets\\images\\anonymous.png" },
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
