
const mongoose = require("mongoose");

const VoterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: String },
  voterId: { type: String },
   gender: {String},
  state: {String},
  hasVoted: { type: Boolean, default: false },
  party: { type: String, default: "" },
  role:{
  type:String,
  default:"voter",
  faceImage:{
type:String   // base64 image
}
  
},
createdAt: {
type: Date,
default: Date.now
}
});

module.exports = mongoose.model("Voter", VoterSchema);