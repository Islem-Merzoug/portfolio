const express = require("express");
const router = express.Router();


const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()


const LoginController = require("../../controllers/auth-controllers/login-controller");

router.post("/login", jsonParser, LoginController.login);

module.exports = router;