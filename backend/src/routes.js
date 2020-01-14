const { Router } = require("express");
const devControllers = require("./controllers/DevControllers");
const searchControllers = require("./controllers/searchController");

const routes = Router();

routes.get("/devs", devControllers.getAllDevs);
routes.post("/devs", devControllers.postDev);

routes.get("/search", searchControllers.index);
module.exports = routes;
