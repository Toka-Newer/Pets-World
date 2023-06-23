const express = require("express");
const vetController = require("./../../controllers/Vet/vetController");
const vetValidation = require("./../../core/Validation/vetValidation");
const checkValidation = require("./../../core/Validation/checkValidation");
const ownerController = require("./../../controllers/Owner/ownerController");
const ownerRoute = express.Router();

ownerRoute.route("/owners/:id").patch(ownerController.updateOwnerById);

module.exports = ownerRoute;
