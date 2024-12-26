import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoute from "./routes/user.route.js"

const app = express()
dotenv.config()
const port = process.env.PORT;
const MONOGO_URL=process.env.MONGO_URI
//Middleware
app.use(express.json())




//Database conneted
try{
mongoose.connect(MONOGO_URL)
console.log("Connected to MongoDB")
}catch(error){
console.log(error)
}
// defining Routes..........
app.get('/', (req, res) => {
  res.send('Yahu ji balle baale!')
})
app.use("/api/users",userRoute);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})