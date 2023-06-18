const express = require("express");
const vetBookingController = require("./../../controllers/Vet/vetBookingController");
const vetBookingValidation = require("./../../core/Validation/vetBookingValidation");
const checkValidation = require("./../../core/Validation/checkValidation");
const authorization = require("./../../core/Authorization/Authorization");
const vetRoute = express.Router();

vetRoute.route("/vetBooking")
    .get(vetBookingController.getVetBooking)
    .post(authorization.checkOwner,
        vetBookingValidation.addVetBookingValidator,
        checkValidation,
        vetBookingController.addVetBooking)

vetRoute.route("/vetBooking/:id")
    .get(vetBookingValidation.getVetBookingByIdValidator,
        checkValidation,
        vetBookingController.getVetBookingById)
    .patch(vetBookingValidation.updateVetBookingValidator,
        checkValidation,
        vetBookingController.updateVetBooking)

module.exports = vetRoute;
