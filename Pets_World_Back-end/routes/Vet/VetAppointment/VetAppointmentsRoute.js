const express = require("express");
const VetAppointmentsRoute = express.Router();
const {
  getVetAppointments,
  getVetAppointmentsById,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  getVetLastAppointmentsById,
} = require("../../../controllers/Vet/VetAppointment/VetAppointmentController");
const vetAppointmentValidation = require("./../../../core/Validation/VetAppointmentValidation");
const checkValidation = require("./../../../core/Validation/checkValidation");

VetAppointmentsRoute.route("/vet/appointments")
  .get(getVetAppointments)
  .patch(vetAppointmentValidation.updateVetAppointmentValidator,
    updateAppointment)
  .delete(deleteAppointment);

VetAppointmentsRoute.route("/vet/appointments/:id")
  .get(vetAppointmentValidation.getVetAppointmentByVetIdValidator,
    getVetAppointmentsById)
  .post(vetAppointmentValidation.addVetAppointmentValidator,
    addAppointment);

VetAppointmentsRoute.route("/vet/lastAppointments/:id")
  .get(vetAppointmentValidation.getVetAppointmentByVetIdValidator,
    getVetLastAppointmentsById)

module.exports = VetAppointmentsRoute;
