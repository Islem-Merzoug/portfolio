const { model } = require("mongoose");
const connection = require("../models/database");
var express = require('express');
var app = express()
app.use(express.json())

var Education= require('../models/education-model');

/* create Education */
const createEducation = async (req, res, next) => {
    Education = new Education({
        name: req.body.name, 
        diploma: req.body.diploma, 
        from: req.body.from, 
        to: req.body.to,
        college: req.body.college,
        description: req.body.description
    }) 

    Education
        .save()
        .then((Education) => {
            console.log('Education created', Education)
            res.send(Education);
        }).catch((error) => {
            console.log(error)
            res.status(500).send(error);
        });


    // Experience.create(res.body).then((Experience) => {
    //     res.status(203).send(Experience);
    //     console.log('done')
    // }).catch((error) => {
    //     res.status(400).send(error);
    // })
}

const getEducation = async (req, res, next) => {
    const id = req.params.id;
    Education
        .findById(id)
        .exec()
        .then(Education  => {
            console.log('Education got', Education)
            res.status(200).json({Education})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: error})
        })
}

const getAllEducation = async (req, res, next) => {
    Education
        .find()
        .exec()
        .then(Educations  => {
            console.log('All Educations got', Educations)
            res.status(200).json({Educations})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: error})
        })
}

const deleteEducation = async (req, res, next) => {
    const id = req.params.id;
    Education
        .deleteOne({_id: id})
        .exec()
        .then(result  => {
            console.log('Education deleted', result)
            res.status(200).json({result})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: error})
        })
}

const updateEducation = async (req, res, next) => {
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

    Education
        .updateOne({_id: id}, {$set: setObj})
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



exports.createEducation = createEducation;
exports.getEducation = getEducation;
exports.getAllEducation = getAllEducation;
exports.deleteEducation = deleteEducation;
exports.updateEducation = updateEducation;
