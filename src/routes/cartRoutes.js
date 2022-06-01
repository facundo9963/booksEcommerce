const { Router } = require("express")
const {addProduct, getProducts, buyCart} = require("../controllers/cartController")
const auth = require("../middlewares/auth")
const router = Router()

router.post("/add", auth, addProduct)
router.get("/getProducts",auth, getProducts)
router.put("/buyCart",auth, buyCart)


module.exports = router