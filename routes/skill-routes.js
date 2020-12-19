var express = require('express');
var router = express.Router();

const skillController = require("../controllers/skill-controller");

/* Create */
router.post('/create', skillController.createSkill);

/* Get */
router.get('/get/:id', skillController.getSkill);
router.get('/get', skillController.getAllSkill);

/* delete */
router.delete('/delete/:id', skillController.deleteSkill);

/* update */
router.patch('/update/:id', skillController.updateSkill);

module.exports = router;