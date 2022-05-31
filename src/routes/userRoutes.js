const { Router } = require("express")
const {createUser, login, addProfileData} = require("../controllers/userController")
const auth = require("../middlewares/auth")
const router = Router()

router.post("/register", createUser)
router.post("/login", login)
router.put("/updateProfile", auth, addProfileData)


module.exports = router