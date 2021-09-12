const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const singupSchema = new mongoose.Schema({
    fisrtname:{
        type: String,
        // required:true
        required:true
    },
    lastname:{
        type: String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    pass:{
        type:String,
        required:true,      
    }
});

singupSchema.pre("save",async function (next) {
    this.pass = await bcrypt.hash(this.pass,10);
    // console.log("dsad");
    next();
} );

const register = new mongoose.model("User",singupSchema);
// console.log("Dipak");
module.exports = register;