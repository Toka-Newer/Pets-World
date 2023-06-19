const express = require("express");
const vetController = require("./../../controllers/Vet/vetController");
const vetValidation = require("./../../core/Validation/vetValidation");
const checkValidation = require("./../../core/Validation/checkValidation");
const vetRoute = express.Router();


vetRoute.route("/vets/:id")
    .get(vetValidation.getVetByIdValidator,
        checkValidation,
        vetController.getVetById)

module.exports = vetRoute;
