const mongoose = require("mongoose");
const VetAppointmentsSchema = mongoose.model("VetAppointments");

getVetAppointments = async (req, res, next) => {
  try {
    const vetAppointments = await VetAppointmentsSchema.find({});
    res.status(200).json(vetAppointments);
  } catch (err) {
    next(err);
  }
};

getVetAppointmentsById = async (req, res, next) => {
  try {
    const vetAppointments = await VetAppointmentsSchema.findOne({
      vet_id: req.params.id,
    }).populate({
      path: "vet_id",
      populate: {
        path: "user_id",
      },
    });
    res.status(200).json(vetAppointments);
  } catch (err) {
    next(err);
  }
};

addAppointment = async (req, res, next) => {
  try {
    const start_date = new Date(req.body.start_date);
    const end_date = new Date(req.body.end_date);
    for (start_date; start_date <= end_date; ) {
      const appointment = new VetAppointmentsSchema({
        vet_id: req.params.id,
        day: start_date,
        start_time: new Date(req.body.start_time),
        end_time: new Date(req.body.end_time),
        number_of_clients: req.body.number_of_clients,
      });
      await appointment.save();
      start_date.setDate(start_date.getDate() + 1);
    }
    res.status(201).json({ message: "appintment is added successfully" });
  } catch (err) {
    next(err);
  }
};

updateAppointment = async (req, res, nex) => {
  try {
    const vet = await VetAppointmentsSchema.findOneAndUpdate(
      {
        _id: req.body.id,
      },
      {
        day: req.body.day,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        number_of_clients: req.body.number_of_clients,
      },
      { new: true }
    );
    res.status(201).json(vet);
  } catch (err) {
    next(err);
  }
};

deleteAppointment = async (req, res, next) => {
  try {
    await VetAppointmentsSchema.findOneAndDelete({
      _id: req.body.id,
    });
    res
      .status(200)
      .json({ message: "appintment has been deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getVetAppointments,
  getVetAppointmentsById,
  addAppointment,
  updateAppointment,
  deleteAppointment,
};
