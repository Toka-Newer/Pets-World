const { body, param, query } = require("express-validator");

module.exports.getVetAppointmentByIdValidator = [
    param("id").isMongoId().withMessage("The Appointment id isn't Valid"),
];

module.exports.addVetAppointmentValidator = [
    body("vet_id").isMongoId().withMessage("that Vet id isn't Valid"),
    body("day").isDate().withMessage("Invalid day format"),
    body("start_time").isDate().withMessage("Invalid start_time format"),
    body("end_time").isDate().withMessage("Invalid end_time format"),
    body("number_of_clients").isInt({ min: 1 }).withMessage("Number Of Clients should be Integer and 1 or more"),
];

module.exports.updateVetAppointmentValidator = [
    body("vet_id").optional().isMongoId().withMessage("that Vet id isn't Valid"),
    body("day").optional().isDate().withMessage("Invalid day format"),
    body("start_time").optional().isDate().withMessage("Invalid start_time format"),
    body("end_time").optional().isDate().withMessage("Invalid end_time format"),
    body("number_of_clients").optional().isInt({ min: 1 }).withMessage("Number Of Clients should be Integer and 1 or more"),
]

module.exports.deleteVetAppointmentValidator = [
    param("id").isMongoId().withMessage("The Appointment id isn't Valid"),
];
