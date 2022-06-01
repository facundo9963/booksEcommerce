const { Router } = require("express")
const {addProduct} = require("../controllers/cartController")
const router = Router()

router.post("/add", addProduct)


module.exports = router