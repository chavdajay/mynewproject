const { signup, login } = require("../Controllers/authController");
const {
  loginValidation,
  signupValidation,
} = require("../Middlewares/authValidation");

const router = require("express").Router();

router.post("/login", loginValidation, login);
router.post("/register", signupValidation, signup);

module.exports = router;
