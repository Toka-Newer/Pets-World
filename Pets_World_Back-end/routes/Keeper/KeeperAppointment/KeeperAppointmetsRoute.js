const express = require("express");
const KeeperAppointmentsRoute = express.Router();
const {
  getKeeperAppointments,
  getKeeperAppointmentsById,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../../../controllers/Keeper/KeeperAppointment/KeeperAppointmentController");

KeeperAppointmentsRoute.route("/keeper/appointments")
  .get(getKeeperAppointments)
  .patch(updateAppointment)
  .delete(deleteAppointment);

KeeperAppointmentsRoute.route("/keeper/appointments/:id")
  .get(getKeeperAppointmentsById)
  .post(addAppointment);

module.exports = KeeperAppointmentsRoute;
