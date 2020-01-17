const Dev = require("./../models/dev");
const transArray = require("./../utils/transArray");

const index = async (req, res) => {
  try {
    console.log(req.query);

    const { latitude, longitude, techs } = req.query;
    const techsArray = transArray(techs);
    //console.log(techsArray);

    const result = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [latitude, longitude]
          },
          $maxDistance: 10000
        }
      }
    });
    res.status(200).json({
      result
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

module.exports = {
  index
};
