const mongoose = require('mongoose')
const serverConfig = require('./serverConfig')
/**
 * The below function helps us to connect to a Mongodb server
 */
async function connectDB(){
   try{
       await mongoose.connect(serverConfig.DB_URL)
       console.log("Sucessfully connected to the mongodb server")
    }catch(error){
       console.log("Not able to connect to the mongodb server")
       console.log(error)
   }
}
module.exports = connectDB;