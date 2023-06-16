const mongoose = require("mongoose");
const userSchema = mongoose.model("User");

addUser = async (req, res, next) => {
  try {
    if (req.body.retypePassword == req.body.password) {
      const newUser = new userSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        role: req.body.role,
        gender: req.body.gender,
        ...(req.file && { image: req.file.path }), // Include the image field
      });

      // Code to check if the email is already registered
      const existingUser = await userSchema.findOne({ email: req.body.email });

      if (existingUser) {
        // Return an error response with a specific message for duplicate email
        console.log(existingUser + "else");
        return res
          .status(400)
          .json({ message: "This email is already registered." });
      }
      // Save the new user
      const savedUser = await newUser.save();
      // Return a success response
      return res.status(201).json({ data: savedUser });
    } else {
      // Passwords do not match
      const error = new Error("Passwords do not match.");
      error.status = 400;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addUser,
};
