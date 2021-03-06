const axios = require("axios");
const Dev = require("./../models/dev");
const transArray = require("./../utils/transArray");
const { findConnections, sendMessage } = require("../websocket");

const postDev = async (req, res) => {
  //clients requests
  //console.log(req.body);
  const { github_userName, techs, latitude, longitude } = req.body;
  //github API response
  const axiosResponse = await axios.get(
    `https://api.github.com/users/${github_userName}`
  );
  //destructring API response
  const { name = login, avatar_url, bio } = axiosResponse.data;

  const techsArray = transArray(techs);

  //location
  const location = {
    type: "Point",
    coordinates: [latitude, longitude]
  };

  //post on DB
  const dev = await Dev.create({
    github_userName,
    name,
    avatar_url,
    bio,
    techs: techsArray,
    location
  });

  console.log(latitude, longitude, techsArray);

  const sendMessageTo = findConnections(
    {
      latitude,
      longitude
    },
    techsArray
  );
  console.log(sendMessageTo);
  console.log(dev);
  sendMessage(sendMessageTo, "new-dev", dev);

  return res.json(dev);
};

const getAllDevs = async (req, res) => {
  try {
    const allDevs = await Dev.find();

    res.status(200).json({
      allDevs
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "err"
    });
  }
};

module.exports = {
  postDev,
  getAllDevs
};
