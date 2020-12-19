const { model } = require("mongoose");
const connection = require("../models/database");
var express = require('express');
var app = express()
app.use(express.json())

var Aboutme= require('../models/aboutme-model');

/* create Aboutme */
const createAboutme = async (req, res, next) => {
    console.log(req.file)
    // aboutme = new Aboutme({
    //     name:           req.body.name, 
    //     age:            req.body.age,
    //     speciality:     req.body.speciality,
    //     description:    req.body.description,
    //     date_of_birth:  req.body.date_of_birth,
    //     email:          req.body.email,
    //     mobile_no:      req.body.mobile_no,
    //     address:        req.body.address,
    //     language:       req.body.language,
    //     cv:             req.body.cv,
    //     created_at:     req.body.created_at
    // }) 

    aboutme = new Aboutme({
        title:  req.body.title, 
        author: req.body.author,
        body:   req.body.body,
        cv:     req.file.path

    }) 

    aboutme
        .save()
        .then((aboutme) => {
            console.log('done')
            res.send(aboutme);
        }).catch((error) => {
            console.log(error)
            res.status(500).send(error);
        });


    // Aboutme.create(res.body).then((aboutme) => {
    //     res.status(203).send(aboutme);
    //     console.log('done')
    // }).catch((error) => {
    //     res.status(400).send(error);
    // })
}

const getAboutme = async (req, res, next) => {
    const id = req.params.id;
    Aboutme.findById(id)
        .exec()
        .then(aboutme  => {
            console.log(aboutme);
            res.status(200).json({aboutme})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: error})
        })
}

const getAllAboutme = async (req, res, next) => {
    Aboutme.find()
        .exec()
        .then(aboutmes  => {
            console.log(aboutmes);
            res.status(200).json({aboutmes})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: error})
        })
}

const deleteAboutme = async (req, res, next) => {
    const id = req.params.id;
    Aboutme.deleteOne({_id: id})
        .exec()
        .then(result  => {
            console.log(result);
            res.status(200).json({result})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: error})
        })
}

const updateAboutme = async (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    var setObj = {};

    // for (const ops of req.body) {
    //     updateOps[ops.propName] = ops.value;
    // }

    for (let [key, value] of Object.entries(req.body)){
        updateOps[key] = value;
      }
    setObj[updateOps.propName] = updateOps.value
    console.log("setObj:", setObj);

    Aboutme.updateOne({_id: id}, {$set: setObj})
        .exec()
        .then(result  => {
            console.log(result);
            res.status(200).json({result})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: error})
        })
}



exports.createAboutme = createAboutme;
exports.getAboutme = getAboutme;
exports.getAllAboutme = getAllAboutme;
exports.deleteAboutme = deleteAboutme;
exports.updateAboutme = updateAboutme;
