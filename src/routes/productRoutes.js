const { Router } = require("express")
const {addProduct, updateStock, getProducts} = require("../controllers/productController")
const router = Router()

router.post("/add", addProduct)
router.put("/changeStock", updateStock)
router.get("/allProducts", getProducts)


module.exports = router