const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

//RUta Celebrities
const celebritiesRoutes= require("./celebrities.routes.js")
router.use("/celebrities", celebritiesRoutes)

//Ruta Movies
const moviesRoutes= require("./movies.routes.js")
router.use("/movies", moviesRoutes)

module.exports = router;
