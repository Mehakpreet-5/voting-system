
const express = require("express")
const router = express.Router()

const Voter = require("../models/Voter")

// Register
router.post("/register", async (req, res) => {

  const { name, dob, voterId, email, password, faceImage } = req.body

  const voter = new Voter({
    name,
    dob,
    voterId,
    email,
    password,
    faceImage,
    role: "voter" // default role
  })

  await voter.save()

  res.json({ message: "Registered Successfully" })
})

// Login
router.post("/login", async (req, res) => {

  const { email, password } = req.body

  try {

    const voter = await Voter.findOne({ email })

    if (!voter) {
      return res.json({ message: "User not found" })
    }

    if (voter.password !== password) {
      return res.json({ message: "Wrong password" })
    }

    // FULL USER DATA SEND
    res.json({
      message: "Login successful",
      user: voter
    })

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: "Server error"
    })

  }

})


// GET USER DATA
router.get("/userdata/:id", async (req, res) => {

  try {

    const user = await Voter.findById(req.params.id)

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      })

    }

    res.status(200).json(user)

  } catch (err) {

    console.log(err)

    res.status(500).json({
      message: "Server error"
    })

  }

})

// Check vote status
router.get("/check", async (req, res) => {
  try {

    const email = req.query.email

    if (!email) {
      return res.status(400).json({ error: "Email is required" })
    }

    const voter = await Voter.findOne({ email })

    if (!voter) {
      return res.json({ voted: false })
    }

    res.json({
      voted: voter.hasVoted || false,
      voter
    })

  } catch (err) {

    console.error(err)
    res.status(500).json({ error: "Server error" })

  }
})

module.exports = router