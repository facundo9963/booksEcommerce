const { Router } = require("express")
const {addPurchase} = require("../controllers/purchaseController")
const router = Router()

router.post("/add", addPurchase)



module.exports = router