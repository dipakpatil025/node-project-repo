const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const categorySchemas = new mongoose.Schema({
    title:{
        type: String,
        // required:true
        required:true
    },
    description:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now

    }
});


const category = new mongoose.model("category",categorySchemas);
// console.log("Dipak");
module.exports = category;