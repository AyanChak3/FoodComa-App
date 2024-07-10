const express = require('express');
const ServerConfig = require('./config/serverConfig')
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoute');
const app = express();
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended : true}))
//Routing middleware
//Request starts with /users,then handle it using userRouter
app.use('/users',userRouter)//Connects the router to the server
app.use('/carts',cartRouter)
app.use('/auth',authRouter)
app.post('/ping',(req,res)=>{
    console.log(req.body)
    return res.json({message : "pong"})
})
app.listen(ServerConfig.PORT,async()=>{
    await connectDB();
    console.log(`Server started at port ${ServerConfig.PORT}...`)
})