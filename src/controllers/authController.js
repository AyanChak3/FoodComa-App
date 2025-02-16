const { COOKIE_SECURE, FRONTEND_URL } = require('../config/serverConfig')
const { loginUser } = require("../services/authService");
async function logout(req,res){
    console.log("Cookie from Frontend",req.cookies)
    res.cookie("authToken","",{
            httpOnly : true,
            secure : COOKIE_SECURE,
            sameSite : "lax",
            domain : FRONTEND_URL,
            maxAge : 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
        success : true,
        message : "Log out successfully",
        error : {},
        data : {}
    })
}
async function login(req,res){
    try{
        const loginPayload = req.body;
        const response = await loginUser(loginPayload)
        res.cookie("authToken",response.token,{
            httpOnly : true,
            secure : false,
            maxAge : 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            success : true,
            message : "Logged in succesfully",
            data : {
                userRole : response.userRole,
                userData : response.userData
            },
            error : {}
        })
    }catch(error){
        return res.status(error.statusCode).json({
            success : false,
            data : {},
            message : error.message,
            error : error
        })
    }
}
module.exports = {
    login,
    logout
}