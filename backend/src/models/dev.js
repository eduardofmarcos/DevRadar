const mongoose = require("mongoose");
const PointSchema = require("./utils/PointSchema");

const DevSchema = new mongoose.Schema({
  name: String,
  github_userName: {
    type: String,
    unique: true
  },
  bio: String,
  avatar_Url: String,
  techs: [String],
  location: {
    type: PointSchema,
    createIndexes: "2dsphere"
  }
});

module.exports = mongoose.model("dev", DevSchema);
