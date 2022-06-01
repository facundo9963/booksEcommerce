const { Router } = require("express")
const {addProduct, getProducts} = require("../controllers/cartController")
const auth = require("../middlewares/auth")
const router = Router()

router.post("/add", auth, addProduct)
router.get("/getProducts",auth, getProducts)


module.exports = router