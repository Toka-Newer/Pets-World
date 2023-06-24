const mongoose = require("mongoose");
const KeeperSchema = mongoose.model("Keeper");

getKeeperById = async (req, res, next) => {
  try {
    const keeper = await KeeperSchema.find({
      _id: req.params.id,
    }).populate({
      path: "owner_id",
    });
    res.status(200).json(keeper);
  } catch (err) {
    next(err);
  }
};
getAllKeeprs = async (req, res, next) => {
  try {
    const keeper = await KeeperSchema.find({
      owner_id: { $ne: req.params.id },
    }).populate({
      path: "owner_id",
    });
    res.status(200).json(keeper);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getKeeperById,
  getAllKeeprs,
};
