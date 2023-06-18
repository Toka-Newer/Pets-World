const mongoose = require("mongoose");
const VetBookingSchema = mongoose.model("VetBooking");

getVetBooking = async (req, res, next) => {
    try {
        const vetBooking = await VetBookingSchema.find({});
        res.status(200).json(vetBooking);
    } catch (err) {
        next(err);
    }
};

getVetBookingById = async (req, res, next) => {
    try {
        const vetBooking = await VetBookingSchema.findOne({ _id: req.params.id })
            .populate([
                { path: "vet_id" },
                { path: "owner_id" },
            ]);
        res.status(200).json(vetBooking);
    } catch (err) {
        next(err);
    }
};

addVetBooking = async (req, res, next) => {
    try {
        const book = new VetBookingSchema({
            vet_id: req.body.vet_id,
            owner_id: req.body.owner_id,
            pet_id: req.body.pet_id,
            day: req.body.day,
        });
        console.log("book")
        await book.save();
        res.status(201).json({ message: "booking done successfully" });
    } catch (err) {
        next(err);
    }
};

updateVetBooking = async (req, res, next) => {
    // check that the date is before the appiontment by 2 hours at least
    try {
        const vetBooking = await VetBookingSchema.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );

        res.status(200).json(vetBooking);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getVetBooking,
    getVetBookingById,
    addVetBooking,
    updateVetBooking,
};
