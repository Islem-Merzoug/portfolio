const express = require("express");
const router = express.Router();

const SigninController = require("../../controllers/auth-controllers/signin-controller");

router.post("/signin", SigninController.createUser);
router.delete("/delete/:id", SigninController.deleteUser);

module.exports = router;