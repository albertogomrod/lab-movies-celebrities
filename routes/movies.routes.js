const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movies = require("../models/Movie.model");

// GET => Renderizar la pagina de crear pelis
router.get("/create", async (req, res, next) => {
  try {
    const response = await Celebrity.find().select("name");
    res.render("movies/new-movie.hbs", {
      listCelebrities: response,
    });
  } catch (error) {
    next(error);
  }
});
// POST => Crear pelis
router.post("/create", async (req, res, next) => {
  try {
    await Movies.create({
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.celebrity,
    });
    console.log(req.body.celebrity);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

//GET => Listar pelis

router.get("/", async (req, res, next) => {
  try {
    const response = await Movies.find();
    res.render("movies/movies.hbs", {
      listMovies: response,
    });
  } catch (error) {
    next(error);
  }
});

//GET => Renderizas detalles pelicula

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Movies.findById(id).populate("cast");
    res.render("movies/movie-details.hbs", {
      movieDetails: response,
    });
  } catch (error) {
    next(error);
  }
});

// GET => renderizar edición de pelcula
router.get("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Movies.findById(id);
    res.render("movies/edit-movie.hbs", {
      editMovie: response,
    });
  } catch (error) {
    next(error);
  }
});

// POST => editar
router.post("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movies.findOneAndUpdate(id, {
      title: req.body.title,
      genre: req.body.genre,
      plot: req.body.plot,
      cast: req.body.celebrity,
    });
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

// POST => borrar pelicula
router.post("/:id/delete", async (req, res, next) => {
  const { id } = req.params;
  try {
    await Movies.findByIdAndRemove(id);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
