const { model } = require("mongoose");
const connection = require("../models/database");
var express = require('express');
var app = express()
app.use(express.json())

var Project= require('../models/project-model');

/* create Experience */
const createProject = async (req, res, next) => {
    Project = new Project({
        name: req.body.name, 
        link: req.body.link,
        description: req.body.description
    }) 

    Project
        .save()
        .then((Project) => {
            console.log('Project created', Project)
            res.send(Project);
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

const getProject = async (req, res, next) => {
    const id = req.params.id;
    Project
        .findById(id)
        .exec()
        .then(Project  => {
            console.log('Project got', Project)
            res.status(200).json({Project})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: error})
        })
}

const getAllProject = async (req, res, next) => {
    Project
        .find()
        .exec()
        .then(Projects  => {
            console.log('All Projects got', Projects)
            res.status(200).json({Projects})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: error})
        })
}

const deleteProject = async (req, res, next) => {
    const id = req.params.id;
    Project
        .deleteOne({_id: id})
        .exec()
        .then(result  => {
            console.log('Project deleted', result)
            res.status(200).json({result})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: error})
        })
}

const updateProject = async (req, res, next) => {
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

    Project
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



exports.createProject = createProject;
exports.getProject = getProject;
exports.getAllProject = getAllProject;
exports.deleteProject = deleteProject;
exports.updateProject = updateProject;
