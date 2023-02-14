const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model.js")

// GET
router.get("/create", (req, res, next) =>{
    res.render("celebrities/new-celebrities.hbs")
})

// POST
router.post("/create", async(req, res, next) => {
    try {
    await Celebrity.create({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    })
    res.redirect("/celebrities")
        
    } catch (error) {
        next(error)
    }
})

//GET => Listar

router.get("/", async (req,res,next)=>{
try {
    const response = await Celebrity.find()
    res.render ("celebrities/celebrities.hbs", {
        listCelebrities: response
    })
} catch (error) {
    next(error)
}
})

module.exports = router;