var express = require('express');
var router = express.Router();
const checkAuth = require("../controllers/auth-controllers/checkAuth-controller")

const educationController = require("../controllers/education-controller");

/* Create */
router.post('/create', checkAuth, educationController.createEducation);

/* Get */
router.get('/get/:id', educationController.getEducation);
router.get('/get', educationController.getAllEducation);

/* delete */
router.delete('/delete/:id', educationController.deleteEducation);

/* update */
router.patch('/update/:id', educationController.updateEducation);

module.exports = router;