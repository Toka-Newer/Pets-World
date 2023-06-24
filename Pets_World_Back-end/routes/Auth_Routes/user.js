const express = require("express");

const userController = require("./../../controllers/userController");
const userValidation = require("./../../core/Validation/userValidation");
const checkValidation = require("./../../core/Validation/checkValidation");
const userRoute = express.Router();

userRoute
    .route("/password/:id")
    .patch(
        userValidation.updateUserPasswordValidator,
        checkValidation,
        userController.updateUserPassword
    );

module.exports = userRoute;
