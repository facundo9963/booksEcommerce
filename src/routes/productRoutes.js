const { Router } = require("express")
const {addProduct, updateStock} = require("../controllers/productController")
const router = Router()

router.post("/add", addProduct)
router.put("/changeStock", updateStock)


module.exports = router