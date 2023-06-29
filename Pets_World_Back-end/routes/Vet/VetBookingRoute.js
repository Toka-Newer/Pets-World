const express = require("express");
const vetBookingController = require("./../../controllers/Vet/vetBookingController");
const vetBookingValidation = require("./../../core/Validation/vetBookingValidation");
const checkValidation = require("./../../core/Validation/checkValidation");
const authorization = require("./../../core/Authorization/Authorization");
const vetRoute = express.Router();

vetRoute
  .route("/vet/booking")
  .get(vetBookingController.getVetBooking)
  .post(
    authorization.checkOwner,
    vetBookingValidation.addVetBookingValidator,
    checkValidation,
    vetBookingController.addVetBooking
  );

vetRoute
  .route("/vet/booking/:id")
  .get(
    vetBookingValidation.getVetBookingByIdValidator,
    checkValidation,
    vetBookingController.getVetBookingByVetId
  )
  .patch(
    vetBookingValidation.updateVetBookingValidator,
    checkValidation,
    vetBookingController.updateVetBooking
  )
  .delete(
    vetBookingValidation.deleteVetBookingValidator,
    checkValidation,
    vetBookingController.deleteVetBooking
  );

module.exports = vetRoute;
