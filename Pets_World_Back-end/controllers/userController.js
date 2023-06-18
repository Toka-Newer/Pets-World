const mongoose = require("mongoose");
const userSchema = mongoose.model("User");
const OwnerSchema = mongoose.model("Owner");
const VetSchema = mongoose.model("Vet");

addUser = async (req, res, next) => {
  try {
    if (req.body.retypePassword === req.body.password) {
      const newUser = new userSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        role: req.body.role,
        gender: req.body.gender,
        // ...(req.file && { image: req.file.path }), // Include the image field
      });
      // Handle the license image
      if (req.files && req.files.length > 0) {
        // const userImages = req.files.filter(
        //   (file) => file.fieldname === "image"
        // );
        // if (userImages.length > 0) {
        // newUser.image = userImages[0].path;
        // }
        newUser.image = req.files[0].path;
      }

      // Code to check if the email is already registered
      const existingUser = await userSchema.findOne({ email: req.body.email });
      if (existingUser) {
        // Return an error response with a specific message for duplicate email
        return res
          .status(400)
          .json({ message: "This email is already registered." });
      }

      const savedUser = await newUser.save();

      if (req.body.role === "owner") {
        const owner = new OwnerSchema({
          user_id: savedUser._id,
          pets: [
            {
              name: req.body.petName,
              type: req.body.petType,
              gender: req.body.petGender,
              dateOfBirth: req.body.petDateOfBirth,
              age: req.body.petAge,
              description: req.body.petDescription,
            },
          ],
        });
        await owner.save();
      } else {
        const vet = new VetSchema({
          user_id: savedUser._id,
          cost: req.body.cost,
          experience: req.body.experience,
          description: req.body.description,
        });
        // Handle the license image
        if (req.files && req.files.length > 1) {
          // const licenseImages = req.files.filter(
          //   (file) => file.fieldname === "license"
          // );
          // if (licenseImages.length > 0) {
          // vet.licence = licenseImages[1].path;
          // }
          vet.licence = req.files[1].path;
        }
        await vet.save();
      }

      // Return a success response
      return res.status(201).json({ data: savedUser });
    } else {
      // Passwords do not match
      const error = new Error("Passwords do not match.");
      error.status = 400;
      throw error;
    }
  } catch (error) {
    // Pass the error to the error-handling middleware
    next(error);
  }
};

module.exports = {
  addUser,
};
