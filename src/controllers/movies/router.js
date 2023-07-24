const Router = require("express");
const Controller = require("./controller");

const router = new Router();

router.get("/", Controller.getMovies);

module.exports = router;
