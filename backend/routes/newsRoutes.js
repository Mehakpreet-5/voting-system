const express = require("express")
const router = express.Router()

const Voter = require("../models/Voter")
const News = require("../models/News")
const sendEmail = require("../utils/sendEmail")

// =========================
// EMAIL FUNCTION (IMPORTANT)
// =========================
const sendLatest3UsersEmail = async (title, message) => {

const users = await Voter.find()
.sort({ createdAt: -1 })
.limit(3)

const emails = []

for (let user of users) {
emails.push(user.email)

await sendEmail(
user.email,
"📰 New Election News",
`${title}\n\n${message}`
)
}

return emails
}

// =========================
// POST NEWS
// =========================
router.post("/news", async (req, res) => {

try {

const { title, message } = req.body

const news = await News.create({ title, message })

// 🔥 FIXED CALL
const sentTo = await sendLatest3UsersEmail(title, message)

res.json({
news,
sentTo
})

} catch (err) {
console.log("NEWS ERROR:", err)
res.status(500).json({ message: err.message })
}

})

module.exports = router