const express = require("express");
const VetAppointmentsRoute = express.Router();
const {
  getVetAppointments,
  getVetAppointmentsById,
  addAppointment,
} = require("../../../controllers/Vet/VetAppointment/VetAppointmentController");
VetAppointmentsRoute.route("/vet/appointments")
  .get(getVetAppointments)
  .post(addAppointment);
VetAppointmentsRoute.route("/vet/appointments/:id").get(getVetAppointmentsById);

module.exports = VetAppointmentsRoute;
