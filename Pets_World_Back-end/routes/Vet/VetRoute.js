const express = require("express");
const vetController = require("./../../controllers/Vet/vetController");
const vetValidation = require("./../../core/Validation/vetValidation");
const checkValidation = require("./../../core/Validation/checkValidation");
const vetRoute = express.Router();

vetRoute
  .route("/vets/:id")
  .get(
    vetValidation.getVetByIdValidator,
    checkValidation,
    vetController.getVetById
  )

<<<<<<< HEAD
vetRoute.route("/vets/:id")
    .get(vetValidation.getVetByIdValidator,
        checkValidation,
        vetController.getVetById)
vetRoute.route("/vets").get(vetController.getAllVet)
=======
  .patch(
    vetValidation.updateVetValidator,
    checkValidation,
    vetController.updateVetById
  );

>>>>>>> 79aabdf2eebcdfe26edf350ef3a18d876fe74633
module.exports = vetRoute;
