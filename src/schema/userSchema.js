const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : [true,"First Name is required"],
        minlength : [5,"Frist Name must be atleast 5 character long"],
        lowercase : true,
        trim : true, //if user gives extra spaces then it will automatically remove it
        maxlength : [20,"First name should be less than or equal to 20 characters"]
    },
    lastName : {
        type : String,
        required : [true,"last Name is required"],
        minlength : [5,"last Name must be atleast 5 character long"],
        lowercase : true,
        trim : true, //if user gives extra spaces then it will automatically remove it
        maxlength : [20,"last name should be less than or equal to 20 characters"]
    },
    mobileNumber : {
        type : String,
        trim : true,
        maxlength : [10,"Phone number should be length 10"],
        minlength : [10,"Phone number should be of length 10"],
        unique : [true,"Phone number is already in use"],
        required : [true,"Phone number should be provided"]
    },
    email : {
        type : String,
        trim : true,
        required : [true,"You should provide the email id"],
        unique : [true,"Email already in use"],
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
    },
    password : {
        type : String,
        required : [true,"Password should be provided"],
        minlength : [6,"Password should be minimum 6 characters long"]
    },
    role : {
        type : String,
        enum : ["USER","ADMIN"],
        default : "USER"
    },
    address : {
        type : String
    }
},{
    timestamps : true
})

userSchema.pre("save",async function (){
     //Here you can modify your user before it is saved in mongodb
    console.log(this)//this refers to the document about to be saved to the MongoDB database
    const hashedPassword = await bcrypt.hash(this.password,10)
    this.password = hashedPassword;
})
const User = mongoose.model("User",userSchema)//collection
module.exports = User;