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

const aboutmeSchema = new Schema({
    title: String, 
    author: String,
    body: String,
    cv: { type: String, required: true },

});

var Aboutme = mongoose.model('Aboutme', aboutmeSchema);
module.exports = Aboutme