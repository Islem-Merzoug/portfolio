const { model } = require("mongoose");
const connection = require("../models/database");
var express = require('express');
var app = express()
app.use(express.json())

var Skill= require('../models/skill-model');

/* create Skill */
const createSkill = async (req, res, next) => {
    Skill = new Skill({
        name: req.body.name, 
        level: req.body.level
    }) 
    console.log(Skill)

    Skill
        .save()
        .then((Skill) => {
            console.log('Skill created', Skill)
            res.send(Skill);
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

const getSkill = async (req, res, next) => {
    const id = req.params.id;
    Skill
        .findById(id)
        .exec()
        .then(Skill  => {
            console.log('Skill got', Skill)
            res.status(200).json({Skill})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: error})
        })
}

const getAllSkill = async (req, res, next) => {
    Skill
        .find()
        .exec()
        .then(Skill  => {
            console.log('All Skills got', Skill)
            res.status(200).json({Skill})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: error})
        })
}

const deleteSkill = async (req, res, next) => {
    const id = req.params.id;
    Skill
        .deleteOne({_id: id})
        .exec()
        .then(result  => {
            console.log('Skill deleted', result)
            res.status(200).json({result})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: error})
        })
}

const updateSkill = async (req, res, next) => {
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

    Skill
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



exports.createSkill = createSkill;
exports.getSkill = getSkill;
exports.getAllSkill = getAllSkill;
exports.deleteSkill = deleteSkill;
exports.updateSkill = updateSkill;
