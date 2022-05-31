const { Router } = require("express")
const {addCategory} = require("../controllers/categoryController")
const router = Router()

router.post("/add", addCategory)


module.exports = router