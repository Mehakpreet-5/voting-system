// const mongoose = require("mongoose")

// const voterSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
//   faceImage: String
// })

// module.exports = mongoose.model("Voter", voterSchema)

const mongoose = require("mongoose")

const voteSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  dob:{
    type:String,
    required:true
  },

  voterId:{
    type:String,
    required:true,
    unique:true
  },

  party:{
    type:String,
    required:true
  },
   gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true
  },
  state: {
    type: String,
    required: true
  },

  faceImage:{
    type:String
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

})

module.exports = mongoose.model("Vote", voteSchema)