const { body, param, query } = require("express-validator");

module.exports.getVetBookingByIdValidator = [
  param("id").isMongoId().withMessage("The Booking id isn't Valid"),
];

module.exports.addVetBookingValidator = [
  body("vet_id").isMongoId().withMessage("that Vet id isn't Valid"),
  body("owner_id").isMongoId().withMessage("that Owner id isn't Valid"),
  body("pet_id").isMongoId().withMessage("that Pet id isn't Valid"),
  // body("day").isDate().withMessage("You Shoud Enter a Date"),
];

module.exports.updateVetBookingValidator = [
  body("vet_id").optional().isMongoId().withMessage("that Vet id isn't Valid"),
  body("owner_id").optional().isMongoId().withMessage("that Owner id isn't Valid"),
  body("pet_id").optional().isMongoId().withMessage("that Pet id isn't Valid"),
  body("day").optional().isDate().withMessage("You Shoud Enter a Date"),
];

module.exports.deleteVetBookingValidator = [
  param("id").isMongoId().withMessage("The Booking id isn't Valid"),
];
