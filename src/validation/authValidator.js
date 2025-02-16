const jwt = require('jsonwebtoken');
const { JWT_SECRET, COOKIE_SECURE, FRONTEND_URL } = require('../config/serverConfig');
const UnAuthorisedError = require('../utils/unauthorisedError');

async function isLoggedIn(req,res,next){
    console.log("Inside isLoggedIn", req.cookies)
    const token = req.cookies["authToken"]
    console.log(token)
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
        console.log(decoded, decoded.exp , Date.now()/1000)
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
        console.log(error.name);
        if (error.name === "TokenExpiredError"){
            res.cookie("authToken","",{
                httpOnly : true,
                secure : COOKIE_SECURE,
                sameSite : "lax",
                maxAge : 7 * 24 * 60 * 60 * 1000,
                domain : FRONTEND_URL
            });
            return res.status(200).json({
                success : true,
                message : "Log out successfull",
                error : {},
                data : {}
            })
        }
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