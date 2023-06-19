const mongoose = require("mongoose");
const userSchema = mongoose.model("User");
const OwnerSchema = mongoose.model("Owner");
const PetsSchema = mongoose.model("Pets");
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
        });
        await owner.save();

        const pet = new PetsSchema({
          owner_id: owner._id,
          name: req.body.petName,
          type: req.body.petType,
          gender: req.body.petGender,
          dateOfBirth: req.body.petDateOfBirth,
          age: req.body.petAge,
          description: req.body.petDescription,
        });
        await pet.save();
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
// addUser = async (req, res, next) => {
//   // const session = await mongoose.startSession();
//   // session.startTransaction();

//   // try {
//   if (req.body.retypePassword === req.body.password) {
//     const newUser = new userSchema({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: req.body.password,
//       phone: req.body.phone,
//       role: req.body.role,
//       gender: req.body.gender,
//       ...(req.file && { image: req.file.path }), // Include the image field
//     });

//     // Code to check if the email is already registered
//     const existingUser = await userSchema.findOne({ email: req.body.email });
//     if (existingUser) {
//       // Return an error response with a specific message for duplicate email
//       return res
//         .status(400)
//         .json({ message: "This email is already registered." });
//     }

//     // Save the new user within the transaction
//     // const savedUser = await newUser.save({ session });
//     const savedUser = await newUser.save();

//     if (req.body.role === "owner") {
//       const owner = new OwnerSchema({
//         user_id: savedUser._id,
//       });
//       // await owner.save({ session });
//       await owner.save();
//     } else {
//       const vet = new VetSchema({
//         user_id: savedUser._id,
//       });
//       // await vet.save({ session });
//       await vet.save();
//     }

//     // Commit the transaction
//     // await session.commitTransaction();
//     // session.endSession();

//     // Return a success response
//     return res.status(201).json({ data: savedUser });
//   } else {
//     // Passwords do not match
//     const error = new Error("Passwords do not match.");
//     error.status = 400;
//     throw error;
//   }
//   // } catch (error) {
//   // Rollback the transaction if an error occurred
//   //   await session.abortTransaction();
//   //   session.endSession();
//   //   next(error);
//   // }
// };

module.exports = {
  addUser,
};

// to add more than one pet handel in front first
// addUser = async (req, res, next) => {
//   try {
//     if (req.body.retypePassword === req.body.password) {
//       const newUser = new userSchema({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         email: req.body.email,
//         password: req.body.password,
//         phone: req.body.phone,
//         role: req.body.role,
//         gender: req.body.gender,
//       });

//       // ... existing code ...

//       const savedUser = await newUser.save();

//       if (req.body.role === "owner") {
//         const pets = req.body.pets; // Assume an array of pets is sent in the request body

//         const petPromises = pets.map(async (pet) => {
//           const newPet = new PetsSchema({
//             name: pet.name,
//             type: pet.type,
//             gender: pet.gender,
//             dateOfBirth: pet.dateOfBirth,
//             age: pet.age,
//             description: pet.description,
//           });

//           await newPet.save();

//           return {
//             pet_id: newPet._id,
//           };
//         });

//         const petData = await Promise.all(petPromises);

//         const owner = new OwnerSchema({
//           user_id: savedUser._id,
//           pets: petData,
//         });

//         await owner.save();
//       } else {
//         // ... existing code ...
//       }

//       // Return a success response
//       return res.status(201).json({ data: savedUser });
//     } else {
//       // Passwords do not match
//       const error = new Error("Passwords do not match.");
//       error.status = 400;
//       throw error;
//     }
//   } catch (error) {
//     // Pass the error to the error-handling middleware
//     next(error);
//   }
// };
