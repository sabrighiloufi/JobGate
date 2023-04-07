const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const DB = process.env.DB
 
mongoose.set('strictQuery', true)
 
const database = mongoose.connect(DB, (err)=>{
    if(err){
        console.log("server can't connect to mongoDB"+err)
    }else{
        console.log("server connect to mongoDB successfully")
    }
}) 


module.exports = database