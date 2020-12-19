const { model } = require("mongoose");
const connection = require("../models/database");
var express = require('express');
var app = express()
app.use(express.json())

var Experience= require('../models/experience-model');

/* create Experience */
const createExperience = async (req, res, next) => {
    Experience = new Experience({
        name: req.body.name, 
        detail: req.body.detail,
        description: req.body.description
    }) 

    Experience
        .save()
        .then((Experience) => {
            console.log('Experience created', Experience)
            res.send(Experience);
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

const getExperience = async (req, res, next) => {
    const id = req.params.id;
    Experience
        .findById(id)
        .exec()
        .then(Experience  => {
            console.log('Experience got', Experience)
            res.status(200).json({Experience})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: error})
        })
}

const getAllExperience = async (req, res, next) => {
    Experience
        .find()
        .exec()
        .then(Experiences  => {
            console.log('All Experiences got', Experiences)
            res.status(200).json({Experiences})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: error})
        })
}

const deleteExperience = async (req, res, next) => {
    const id = req.params.id;
    Experience
        .deleteOne({_id: id})
        .exec()
        .then(result  => {
            console.log('Experience deleted', result)
            res.status(200).json({result})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: error})
        })
}

const updateExperience = async (req, res, next) => {
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

    Experience
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



exports.createExperience = createExperience;
exports.getExperience = getExperience;
exports.getAllExperience = getAllExperience;
exports.deleteExperience = deleteExperience;
exports.updateExperience = updateExperience;
