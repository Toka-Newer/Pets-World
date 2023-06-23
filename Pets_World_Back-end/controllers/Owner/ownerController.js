const mongoose = require("mongoose");
const ownerSchema = mongoose.model("Owner");
const userSchema = mongoose.model("User");
const keeperSchema = mongoose.model("Keeper");

updateOwnerById = async (req, res, next) => {
  try {
    const owner = await ownerSchema.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          isKeeper: req.body.isKeeper,
        },
      },
      { new: true }
    );
    if (owner && owner.isKeeper === true) {
      const keeper = await keeperSchema.findOne({ owner_id: owner._id });
      if (keeper) {
        //   update
        const keeper = await keeperSchema.findOneAndUpdate(
          {
            owner_id: owner._id,
          },
          {
            $set: {
              experience: req.body.experience,
              cost: req.body.cost,
              description: req.body.description,
            },
          },
          { new: true }
        );
      } else {
        //   create
        const createKeeper = new keeperSchema({
          owner_id: owner._id,
          experience: req.body.experience,
          cost: req.body.cost,
          description: req.body.description,
        });
        await createKeeper.save();
      }
    }
    const user = await userSchema.findOneAndUpdate(
      { _id: owner.user_id },
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
    return res.status(200).json({ owner, user });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  updateOwnerById,
};
