const mongoose = require("mongoose");
const userSchema = mongoose.model("User");
const OwnerSchema = mongoose.model("Owner");
const VetSchema = mongoose.model("Vet");

addUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

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
        ...(req.file && { image: req.file.path }), // Include the image field
      });

      // Code to check if the email is already registered
      const existingUser = await userSchema.findOne({ email: req.body.email });
      if (existingUser) {
        // Return an error response with a specific message for duplicate email
        return res
          .status(400)
          .json({ message: "This email is already registered." });
      }

      // Save the new user within the transaction
      const savedUser = await newUser.save({ session });
      // const savedUser = await newUser.save();

      if (req.body.role === "owner") {
        const owner = new OwnerSchema({
          user_id: savedUser._id,
        });
        await owner.save({ session });
        // await owner.save();
      } else {
        const vet = new VetSchema({
          user_id: savedUser._id,
        });
        await vet.save({ session });
        // await vet.save();
      }

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      // Return a success response
      return res.status(201).json({ data: savedUser });
    } else {
      // Passwords do not match
      const error = new Error("Passwords do not match.");
      error.status = 400;
      throw error;
    }
  } catch (error) {
    // Rollback the transaction if an error occurred
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

module.exports = {
  addUser,
};
