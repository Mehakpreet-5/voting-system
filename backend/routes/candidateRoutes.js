// // routes/candidateRoutes.js

// const express = require("express");
// const router = express.Router();
// const Candidate = require("../models/Candidate");

// // get all candidates
// router.get("/candidates", async (req, res) => {
//   try {
//     const candidates = await Candidate.find();
//     res.json(candidates);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;

const express = require("express")
const router = express.Router()

const Candidate = require("../models/Candidate")


// GET all candidates
router.get("/candidates", async (req,res)=>{

try{

const candidates = await Candidate.find()

res.json(candidates)

}catch(err){

res.status(500).json({message:err.message})

}

})



// ADD candidate
router.post("/candidates", async (req,res)=>{

try{

const {name,party,status} = req.body

const candidate = new Candidate({
name,
party,
status
})

await candidate.save()

res.json(candidate)

}catch(err){

res.status(500).json({message:err.message})

}

})



// DELETE candidate
router.delete("/candidates/:id", async (req,res)=>{

try{

await Candidate.findByIdAndDelete(req.params.id)

res.json({message:"Candidate deleted"})

}catch(err){

res.status(500).json({message:err.message})

}

})



module.exports = router