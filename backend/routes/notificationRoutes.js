// const express = require("express")
// const router = express.Router()
// const Voter = require("../models/Voter")
// const sendEmail = require("../utils/sendEmail")
// const Notification = require("../models/Notification")

// // add news
// router.post("/news", async (req,res)=>{
// try{

// const {title,message} = req.body

// const news = new Notification({
// title,
// message
// })

// // 🔥 EMAIL SEND AUTOMATICALLY
// sendLatest3UsersEmail(title,message)
// await news.save()

// res.json({message:"News added successfully"})

// }catch(err){
// res.status(500).json({message:err.message})
// }
// })


// // get news
// router.get("/news", async (req,res)=>{
// try{

// const news = await Notification.find().sort({createdAt:-1})

// res.json(news)

// }catch(err){
// res.status(500).json({message:err.message})
// }
// })


// // update news
// router.put("/news/:id", async (req,res)=>{
// try{

// const {title,message} = req.body

// const updatedNews = await Notification.findByIdAndUpdate(
// req.params.id,
// {title,message},
// {new:true}
// )

// res.json(updatedNews)

// }catch(err){
// res.status(500).json({message:err.message})
// }
// })


// // delete news
// router.delete("/news/:id", async (req,res)=>{
// try{

// await Notification.findByIdAndDelete(req.params.id)

// res.json({message:"News deleted successfully"})

// }catch(err){
// res.status(500).json({message:err.message})
// }
// })



// module.exports = router

const express = require("express")
const router = express.Router()

const Voter = require("../models/Voter")
const Notification = require("../models/Notification")
const sendEmail = require("../utils/sendEmail")

// ======================
// EMAIL FUNCTION
// ======================
const sendLatest3UsersEmail = async (title, message) => {

const users = await Voter.find()
.sort({ createdAt: -1 })
.limit(3)

for (let user of users) {
await sendEmail(
user.email,
"📰 New Election News",
`${title}\n\n${message}`
)
}

return users.map(u => u.email)
}


// ======================
// CREATE NEWS
// ======================
router.post("/news", async (req, res) => {

try {

const { title, message } = req.body

// 1️⃣ save first
const news = await new Notification({ title, message }).save()

// 2️⃣ send email AFTER save
const sentTo = await sendLatest3UsersEmail(title, message)

res.json({
message: "News added successfully",
news,
sentTo
})

} catch (err) {
console.log(err)
res.status(500).json({ message: err.message })
}

})


// ======================
// GET NEWS
// ======================
router.get("/news", async (req, res) => {

const news = await Notification.find().sort({ createdAt: -1 })
res.json(news)

})


// ======================
// UPDATE NEWS
// ======================
router.put("/news/:id", async (req, res) => {

const { title, message } = req.body

const updated = await Notification.findByIdAndUpdate(
req.params.id,
{ title, message },
{ new: true }
)

res.json(updated)

})


// ======================
// DELETE NEWS
// ======================
router.delete("/news/:id", async (req, res) => {

await Notification.findByIdAndDelete(req.params.id)

res.json({ message: "News deleted successfully" })

})

module.exports = router