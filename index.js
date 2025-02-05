const express= require("express")
const {config}= require("dotenv")
const mailroutes=require("./Routes/mailRoutes")
config()
const app=express()
app.use(express.json())
app.use(mailroutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server Initialised at port ${process.env.PORT}...`)
})