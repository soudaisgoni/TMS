const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TMSdb1= new Schema({
    idStudent : { type: Number, required: true, unique: true},
    name: { type: String, required: true},
    age: { type: Number },
    cgpa: { type:Number },
    date: { type: Date},
    department:{type: String,enum:["CSE", "TVE"]},
  });

module.exports = mongoose.model("TMSdb1", TMSdb1);