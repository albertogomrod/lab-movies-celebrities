const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movies = require("../models/Movie.model")

// GET
router.get("/create", async(req, res, next) => {
    try {
        const response = await Celebrity.find().select("name")
        res.render("movies/new-movie.hbs", {
            listCelebrities: response
        })
    } catch (error) {
        next(error)
    } 
})
// POST 
router.post("/create", async (req, res, next) => {
 try {
    await Movies.create({
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    })
    res.redirect("/movies")
    

 } catch (error) {
    next(error)
 }
})

module.exports = router;
