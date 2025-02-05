const express= require("express")
const {config}= require("dotenv")
const mailroutes=require("./Routes/mailRoutes")
const cors= require('cors')
config()
const app=express()

app.use(
    cors({
      credentials: true,
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
app.use(express.json())
app.use(mailroutes)

app.listen(process.env.PORT, ()=>{
    console.log(`Server Initialised at port ${process.env.PORT}...`)
})