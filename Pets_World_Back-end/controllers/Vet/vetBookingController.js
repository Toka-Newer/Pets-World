const mongoose = require("mongoose");
const VetBookingSchema = mongoose.model("VetBooking");
const VetAppointmentsSchema = mongoose.model("VetAppointments");
const petsSchema = mongoose.model("Pets");

getVetBooking = async (req, res, next) => {
  try {
    const VetAppointments = await VetAppointmentsSchema.find(req.body);
    res.json(VetAppointments);
  } catch (err) {
    next(err);
  }
};

getVetBookingById = async (req, res, next) => {
  try {
    const vetBooking = await VetBookingSchema.findOne({
      _id: req.params.id,
    }).populate([
      { path: "appointment_id" },
      { path: "owner_id" },
      { path: "pet_id" },
    ]);
    return res.status(200).json(vetBooking);
  } catch (err) {
    next(err);
  }
};

addVetBooking = async (req, res, next) => {
  try {
    const check = await VetBookingSchema.findOne({
      appointment_id: req.body.appointment_id,
      owner_id: req.body.owner_id,
    });

    if (check) {
      return res.status(400).json({ message: "Booking done before" });
    }

    const checkPetOwner = await petsSchema.findOne({
      _id: req.body.pet_id,
      owner_id: req.body.owner_id,
    });

    if (!checkPetOwner) {
      return res
        .status(404)
        .json({ message: "This pet doesn't belong to this owner" });
    }

    const vetBooking = new VetBookingSchema({
      appointment_id: req.body.appointment_id,
      owner_id: req.body.owner_id,
      pet_id: req.body.pet_id,
    });
    await vetBooking.save();

    await VetAppointmentsSchema.findOneAndUpdate(
      { _id: req.body.appointment_id },
      {
        $inc: {
          number_of_clients: -1,
        },
      },
      { new: true }
    );

    return res.status(200).json({ message: "booking done successfully" });
  } catch (err) {
    next(err);
  }
};

updateVetBooking = async (req, res, next) => {
  // check that the date is before the appiontment by 2 hours at least handel in front first
  try {
    if (req.body.pet_id) {
      const checkPetOwner = await petsSchema.findOne({
        _id: req.body.pet_id,
        owner_id: req.body.owner_id, // will get in token
      });

      if (!checkPetOwner) {
        return res
          .status(404)
          .json({ message: "This pet doesn't belong to this owner" });
      }
    }

    const vetBooking = await VetBookingSchema.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(vetBooking);
  } catch (err) {
    next(err);
  }
};

deleteVetBooking = async (req, res, next) => {
  // add apppionntments count number
  try {
    const bookingId = req.params.id;

    const deletedBooking = await VetBookingSchema.findOneAndDelete({
      _id: bookingId,
    });

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    await VetAppointmentsSchema.findOneAndUpdate(
      { _id: req.body.appointment_id },
      {
        $inc: {
          number_of_clients: 1,
        },
      },
      { new: true }
    );

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
};