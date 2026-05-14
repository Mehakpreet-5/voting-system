
const express = require("express");
const router = express.Router();
const Voter = require("../models/Voter");
const Vote = require("../models/Vote"); // your voteSchema

router.post("/submit", async (req, res) => {

  try {

    const { email, party, dob, voterId, name, gender, state, faceImage } = req.body;

    const voter = await Voter.findOne({ email });

    if (!voter) {
      return res.status(404).json({ message: "Voter not found" });
    }

    const vote = new Vote({
      name,email,
      dob,
      voterId,
      party,
      gender, state,
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

router.get("/votes", async (req, res) => {
  try {

    const votes = await Vote.find();

    res.json(votes);

  } catch (error) {

    console.log(error);

    res.status(500).json({ message: "Server error" });

  }
});

module.exports = router;