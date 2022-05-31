const { Router } = require("express")
const {addProduct} = require("../controllers/productController")
const auth = require("../middlewares/auth")
const router = Router()

router.post("/add", addProduct)


module.exports = router