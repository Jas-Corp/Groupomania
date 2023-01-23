const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const isAuth = require("../middlewares/isAuth");

router.post("/signin", authController.signin);
router.post("/login", authController.login);
router.post("/setProfilPicture", isAuth, authController.setProfilPicture);
module.exports = router;
