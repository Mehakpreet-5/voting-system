const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  party:{
    type:String,
    required:true
  },

  votes:{
    type:Number,
    default:0
  },

  status:{
    type:String,
    default:"Active"
  }

});

module.exports = mongoose.model("Candidate", candidateSchema);