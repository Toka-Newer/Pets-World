const mongoose = require("mongoose");
const VetSchema = mongoose.model("Vet");

getVetById = async (req, res, next) => {
    try {
        const vet = await VetSchema.find({
            _id: req.params.id,
        }).populate({
            path: "user_id",
        });
        res.status(200).json(vet);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getVetById,
};
