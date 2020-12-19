var express = require('express');
var router = express.Router();

const experienceController = require("../controllers/experience-controller");

/* Create */
router.post('/create', experienceController.createExperience);

/* Get */
router.get('/get/:id', experienceController.getExperience);
router.get('/get', experienceController.getAllExperience);

/* delete */
router.delete('/delete/:id', experienceController.deleteExperience);

/* update */
router.patch('/update/:id', experienceController.updateExperience);

module.exports = router;