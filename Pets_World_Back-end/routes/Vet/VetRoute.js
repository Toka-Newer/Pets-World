const express = require("express");
const vetController = require("./../../controllers/Vet/vetController");
const vetValidation = require("./../../core/Validation/vetValidation");
const checkValidation = require("./../../core/Validation/checkValidation");
const vetRoute = express.Router();


vetRoute.route("/vets").get(vetController.getAllVet)
  .patch(
    vetValidation.updateVetValidator,
    checkValidation,
    vetController.updateVetById
  );

vetRoute.route("/vets/:id")
  .get(
    vetValidation.getVetByIdValidator,
    checkValidation,
    vetController.getVetById
  )
  .patch(
    vetValidation.getVetByIdValidator,
    checkValidation,
    vetController.updateRating
  )

module.exports = vetRoute;
