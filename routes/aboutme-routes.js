var express = require('express');
var router = express.Router();
const multer = require("multer")
// const upload = multer({dest: "uploads/"})

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


const aboutmeController = require("../controllers/aboutme-controller");

/* Create */
router.post('/create', upload.single('CV'), aboutmeController.createAboutme);

/* Get */
router.get('/get/:id', aboutmeController.getAboutme);
router.get('/get', aboutmeController.getAllAboutme);

/* delete */
router.delete('/delete/:id', aboutmeController.deleteAboutme);

/* update */
router.patch('/update/:id', aboutmeController.updateAboutme);

module.exports = router;