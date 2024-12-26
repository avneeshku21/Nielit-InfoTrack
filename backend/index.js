import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
const app = express()
dotenv.config()
const port = process.env.PORT;
const MONOGO_URL=process.env.MONGO_URI
try{
mongoose.connect(MONOGO_URL)
console.log("Connected to MongoDB")
}catch(error){
console.log(error)

}

app.get('/', (req, res) => {
  res.send('Yahu ji balle baale!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})