const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
 const voteRoutes = require("./routes/voteRoutes")
const votesRouter = require("./routes/votes");
const candidateRoutes = require("./routes/candidateRoutes");
const notificationRoutes = require("./routes/notificationRoutes")

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", notificationRoutes)

connectDB()


app.get("/", (req,res)=>{
    res.send("API running")
})
app.use("/api/auth", authRoutes)
  app.use("/api/vote", voteRoutes)
app.use("/api", votesRouter);
app.use("/api", candidateRoutes);
const PORT = process.env.PORT || 5000



app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})