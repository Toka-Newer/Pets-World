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
    const vetAppointments = await VetAppointmentsSchema.find({
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
    const appointment = new VetAppointmentsSchema({
      vet_id: req.body.vet_id,
      day: req.body.day,
      start_time: new Date(req.body.start_time),
      end_time: new Date(req.body.end_time),
      number_of_clients: req.body.number_of_clients,
    });
    await appointment.save();
    res.status(201).json({ message: "appintment added successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getVetAppointments,
  getVetAppointmentsById,
  addAppointment,
};
