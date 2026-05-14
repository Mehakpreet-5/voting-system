
const express = require("express");
const router = express.Router();
const Voter = require("../models/Voter");
const Vote = require("../models/Vote");

// // CHECK
// router.get("/check", async (req, res) => {
//   const email = req.query.email;

//   const voter = await Voter.findOne({ email });

//   if (!voter) {
//     return res.json({ voted: false });
//   }

//  res.json({
//   voted: voter.hasVoted,
//   voter: {
//     name: voter.name || "N/A",
//     email: voter.email || "N/A",
//     dob: voter.dob || "N/A",
//     voterId: voter.voterId || "N/A",
//     party: voter.party || "N/A",
//     gender: typeof voter.gender === "string" ? voter.gender : JSON.stringify(voter.gender) || "N/A",
//     state: typeof voter.state === "string" ? voter.state : JSON.stringify(voter.state) || "N/A",
//     faceImage: voter.faceImage || null
//     },
//   });
// });


// CHECK
router.get("/check", async (req, res) => {
  const email = req.query.email;

  try {
    const voter = await Voter.findOne({ email });

    if (!voter) {
      return res.json({ voted: false });
    }

    // Send all fields as strings
    res.json({
      voted: voter.hasVoted,
      voter: {
        name: voter.name || "",
        email: voter.email || "",
        dob: voter.dob || "",
        voterId: voter.voterId || "",
        party: voter.party || "",
        gender: voter.gender || "",
        state: voter.state || "",
        faceImage: voter.faceImage || "",
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/submit", async (req, res) => {

  try {

    const { email, party, dob, voterId, name, gender, state, faceImage } = req.body;

    const voter = await Voter.findOne({ email });

    if (!voter) {
      return res.status(404).json({ message: "Voter not found" });
    }

    // FACE VERIFY
    // const isMatch = verifyFaces(voter.faceImage, faceImage);

    // if (!isMatch) {
    //   return res.status(400).json({
    //     message: "Face verification failed"
    //   });
    // }

    const vote = new Vote({
      name,
      dob,
      voterId,
      party,
      gender,
      state,
      faceImage
    });

    await vote.save();

    voter.hasVoted = true;
    voter.party = party;

    await voter.save();

    res.json({
      message: "Vote submitted successfully",
      vote
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

});

// GET ALL VOTES
router.get("/votes", async (req, res) => {
  try {

    const votes = await Vote.find();

    res.json(votes);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }
});

module.exports = router