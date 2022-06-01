const { Router } = require("express")
const router = Router()
const userRoutes = require("./userRoutes")
const productRoutes = require("./productRoutes")
const categoryRoutes = require("./categoryRoutes")
const cartRoutes = require("./cartRoutes")
const purchaseRoutes = require("./purchaseRoutes")



router.use("/users", userRoutes)
router.use("/products", productRoutes)
router.use("/categories", categoryRoutes)
router.use("/cart", cartRoutes)
router.use("/purchases", purchaseRoutes)

module.exports = router