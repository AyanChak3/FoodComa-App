const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const UnAuthorisedError = require('../utils/unauthorisedError');

async function isLoggedIn(req,res,next){
    const token = req.cookies["authToken"]
    if(!token){
        return res.status(401).json({
            success : false,
            data : {},
            error : "Not authenticated",
            message : "No Auth Token provided"
        })
    }
    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        if(!decoded){
            throw new UnAuthorisedError();
        }
        req.user = {
            email : decoded.email,
            id : decoded.id,
            role : decoded.role
        }
        next();
    }catch(error){
        return res.status(401).json({
            success : false,
            data : {},
            error : error,
            message : "Invalid Token provided"
        })
    }
}
function isAdmin(req,res,next){
    //This function checks if the authenticated user is admin or not
    //Because we will call isAdmin after isLoggedIn thats why we will receive the user details
    const loggedInUser = req.user;//loggedIn user email and id comes here
    console.log(loggedInUser)
    if(loggedInUser.role === 'ADMIN'){
        console.log("User is an admin")
        next();
    }else{
        return res.status(401).json({
            success : false,
            data : {},
            message : "You are not authorized for this action",
            error : {
                statusCode : 401,
                reason : "Unauthorized user for this action"
            }
        })
    }
}
module.exports = {
    isLoggedIn,
    isAdmin
}