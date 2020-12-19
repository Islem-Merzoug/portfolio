const express = require("express");
const connection = require("./models/database");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");

const app = new express();


app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({
  extended: true
}));



// const cors = require('cors');
// app.use(cors());

const aboutmeRoutes = require("./routes/aboutme-routes")
const experienceRoutes = require("./routes/experience-routes")
const skillRoutes = require("./routes/skill-routes")
const educationRoutes = require("./routes/education-routes")
const projectRoutes = require("./routes/project-routes")
const userSigninRoutes = require("./routes/auth/signin-routes")
const userLoginRoutes = require("./routes/auth/login-routes")

// /* Routes */
app.use('/api/aboutme',aboutmeRoutes);
app.use('/api/experience',experienceRoutes);
app.use('/api/skill',skillRoutes);
app.use('/api/education',educationRoutes);
app.use('/api/project',projectRoutes);
app.use('/api/user',userSigninRoutes);
app.use('/api/user',userLoginRoutes);


app.use('/uploads', express.static('uploads'));

// app.use((req, res, next) => {
//   return next(new HttpError("Could not find this route.", 404));
// });
// app.use((error, req, res, next) => {
//   if (res.headerSent) {
//     return next(error);
//   }
//   res
//     .status(error.code || 500)
//     .json({ message: error.message || "An unknown error occured!" });
// });

app.listen(3000,() => {
  console.log("Started on PORT 3000");
})