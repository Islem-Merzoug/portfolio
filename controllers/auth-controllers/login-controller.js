const { model } = require("mongoose");
const connection = require("../../models/database");
var express = require('express');
var app = express()
app.use(express.json())
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/user-model");


const login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .exec()
      .then(user => {
        if (user) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }

        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user._id
              },
            //   process.env.JWT_KEY,
              "secretkeyIslem",
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });

        bcrypt.compare(req.body.password,user.password).then((result)=>{
            if(result){
              console.log("authentication successful")
              // do stuff
            } else {
              console.log("authentication failed. Password doesn't match")
              // do other stuff
            }
          })
          .catch((err)=>console.error(err))

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}

exports.login = login;