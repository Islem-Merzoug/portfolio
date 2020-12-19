var express = require('express');
var router = express.Router();

const projectController = require("../controllers/project-constroller");

/* Create */
router.post('/create', projectController.createProject);

/* Get */
router.get('/get/:id', projectController.getProject);
router.get('/get', projectController.getAllProject);

/* delete */
router.delete('/delete/:id', projectController.deleteProject);

/* update */
router.patch('/update/:id', projectController.updateProject);

module.exports = router;