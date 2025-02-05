const nodemailer= require("nodemailer")
const express= require("express")
const mongoose= require("mongoose")
const {config}= require("dotenv")
const mailroutes=require("./Routes/mailRoutes")
config()
const app=express()
app.use(express.json())
app.use(mailroutes)

const connectDB=async()=>{
    try
    {
        await mongoose.connect(`${process.env.MONGO_URL}/TaskerDB`)
        console.log("DB is ready to connect...")
    }
    catch(err)
    {
        console.log("Mongo Error", err)
    }
}
connectDB()

app.listen(process.env.PORT, ()=>{
    console.log(`Server Initialised at port ${process.env.PORT}...`)
})