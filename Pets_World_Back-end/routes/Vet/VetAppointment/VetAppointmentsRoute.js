const express = require("express");
const VetAppointmentsRoute = express.Router();
const {
  getVetAppointments,
  getVetAppointmentsById,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../../../controllers/Vet/VetAppointment/VetAppointmentController");

VetAppointmentsRoute.route("/vet/appointments")
  .get(getVetAppointments)
  .patch(updateAppointment)
  .delete(deleteAppointment);

VetAppointmentsRoute.route("/vet/appointments/:id")
  .get(getVetAppointmentsById)
  .post(addAppointment);

module.exports = VetAppointmentsRoute;
