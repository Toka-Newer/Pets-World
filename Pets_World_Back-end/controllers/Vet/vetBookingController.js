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
                { path: "appointment_id" },
                { path: "owner_id" },
                { path: "pet_id" },
            ]);
        res.status(200).json(vetBooking);
    } catch (err) {
        next(err);
    }
};

addVetBooking = async (req, res, next) => {
    try {
        const book = new VetBookingSchema({
            appointment_id: req.body.appointment_id,
            owner_id: req.body.owner_id,
            pet_id: req.body.pet_id,
        });
        console.log("book")
        await book.save();
        res.status(201).json({ message: "booking done successfully" });
    } catch (err) {
        next(err);
    }
};

updateVetBooking = async (req, res, next) => {
    // check that the date is before the appiontment by 2 hours at least handel in front first
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

deleteVetBooking = async (req, res, next) => {
    try {
        const bookingId = req.params.id;

        const deletedBooking = await VetBookingSchema.findOneAndDelete({ _id: bookingId });

        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found." });
        }

        return res.status(200).json({ message: "Booking deleted successfully." });
    } catch (error) {
        next(error);
    }
};

deleteVetBookingByAppointment = async (req, res, next) => {
    try {
        const appointmentId = req.body.appointment_id;

        const deletedBooking = await VetBookingSchema.deleteMany({ appointment_id: appointmentId });

        if (!deletedBooking) {
            return res.status(404).json({ message: "Booking not found." });
        }

        return res.status(200).json({ message: "Booking deleted successfully." });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getVetBooking,
    getVetBookingById,
    addVetBooking,
    updateVetBooking,
    deleteVetBooking,
    deleteVetBookingByAppointment,
};
