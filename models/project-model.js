const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// const aboutmeSchema = new Schema({
//     name: { type: String, default: 'hahaha' },
//     age: { type: Number, min: 18, index: true },
//     speciality: { type: String },
//     description: { type: String},
//     date_of_birth: { type: Date, default: Date.now },
//     email: { type: String},
//     mobile_no: { type: String},
//     address: { type: String },
//     language: { type: [String] },
//     cv: { type: String },
//     created_at: { type: Date, default: Date.now },
// });

const projectSchema = new Schema({
    name: String, 
    link: String,
    description: String
});

var Project = mongoose.model('Project', projectSchema);
module.exports = Project 