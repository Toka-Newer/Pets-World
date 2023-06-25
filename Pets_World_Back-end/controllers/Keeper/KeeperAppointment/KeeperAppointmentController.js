const mongoose = require("mongoose");
const KeeperAppointmentSchema = mongoose.model("KeeperAppointments");
const KeeperBookingSchema = mongoose.model("KeeperBooking");

getKeeperAppointments = async (req, res, next) => {
  try {
    const KeeperAppointment = await KeeperAppointmentSchema.find({});
    return res.status(200).json(KeeperAppointment);
  } catch (err) {
    next(err);
  }
};

getKeeperAppointmentsById = async (req, res, next) => {
  try {
    const KeeperAppointment = await KeeperAppointmentSchema.find({
      keeper_id: req.params.id,
    });
    return res.status(200).json(KeeperAppointment);
  } catch (err) {
    next(err);
  }
};

getKeeperLastAppointmentsById = async (req, res, next) => {
  try {
    let startOfWeek = new Date();
    let endOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate());
    endOfWeek.setDate(startOfWeek.getDate() + 7);
    const keeperAppointments = await KeeperAppointmentSchema.find({
      keeper_id: req.params.id,
      day: { $gte: startOfWeek, $lte: endOfWeek },
    });
    return res.status(200).json(keeperAppointments);
  } catch (err) {
    next(err);
  }
};

addAppointment = async (req, res, next) => {
  try {
    const appointment = new KeeperAppointmentSchema({
      keeper_id: req.params.id,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      number_of_pets: req.body.number_of_pets,
    });
    await appointment.save();
    return res
      .status(201)
      .json({ message: "appintment is added successfully" });
  } catch (err) {
    next(err);
  }
};

updateAppointment = async (req, res, nex) => {
  try {
    const keeper = await KeeperAppointmentSchema.findOneAndUpdate(
      {
        _id: req.body.id,
      },
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(201).json(keeper);
  } catch (err) {
    next(err);
  }
};

deleteAppointment = async (req, res, next) => {
  try {
    await KeeperBookingSchema.deleteMany({
      appointment_id: req.body.id,
    });
    await KeeperAppointmentSchema.findOneAndDelete({
      _id: req.body.id,
    });
    return res
      .status(200)
      .json({ message: "appointment has been deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getKeeperAppointments,
  getKeeperAppointmentsById,
  getKeeperLastAppointmentsById,
  addAppointment,
  updateAppointment,
  deleteAppointment,
};
