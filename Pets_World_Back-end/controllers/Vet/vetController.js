const mongoose = require("mongoose");
const VetSchema = mongoose.model("Vet");
const userSchema = mongoose.model("User");

getVetById = async (req, res, next) => {
  try {
    const vet = await VetSchema.findOne({
      _id: req.params.id,
    }).populate({
      path: "user_id",
    });
    res.status(200).json(vet);
  } catch (err) {
    next(err);
  }
};
updateVetById = async (req, res, next) => {
  try {
    const vet = await VetSchema.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          experience: req.body.experience,
          cost: req.body.cost,
          description: req.body.description,
        },
      },
      { new: true }
    );
    const user = await userSchema.findOneAndUpdate(
      { _id: vet.user_id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          // password: req.body.password,
          phone: req.body.phone,
          gender: req.body.gender,
          // image: req.body.image,
        },
      },
      { new: true }
    );
    return res.status(200).json({ vet, user });
  } catch (err) {
    next(err);
  }
};
<<<<<<< HEAD
getAllVet = async (req, res, next) => {
    try {
        const vet = await VetSchema.find({
        }).populate({
            path: "user_id",
        });
        res.status(200).json(vet);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getVetById,
    getAllVet
=======
module.exports = {
  getVetById,
  updateVetById,
>>>>>>> 79aabdf2eebcdfe26edf350ef3a18d876fe74633
};
