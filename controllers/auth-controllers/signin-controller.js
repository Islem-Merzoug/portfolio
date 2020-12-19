const { model } = require("mongoose");
const connection = require("../../models/database");
var express = require('express');
var app = express()
app.use(express.json())
const bcrypt = require("bcrypt");


const User = require("../../models/user-model");

/* create User */
const createUser = async(req, res, next) => {
  console.log(req.body.email)
  console.log(req.body.password)
  User.findOne({ email: req.body.email })
      .exec()
      .then((user) => {
        console.log(user)
        if (user) {
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                // _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
              });

              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: "User created"
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            }
          });
        }
      });
}

const deleteUser = async (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .exec()
        .then(result => {
            res.status(200).json({
            message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
            error: err
            });
        });
}
  
exports.createUser = createUser;
exports.deleteUser = deleteUser;