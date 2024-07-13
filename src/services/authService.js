const { findUser } = require("../repositories/userRepository");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET, JWT_EXPIRY } = require('../config/serverConfig')
async function loginUser(authDetails){ //means email and password
    const email = authDetails.email;
    const plainPassword = authDetails.password;
    //1.Check if there is a registereduser with a given email
    const user = await findUser({email});
    if(!user){
        throw { message : " No user found with the given email",statusCode : 404};
    }
    //2.If the user is found then we need to compare plaintextPassword with the hashedPassword
    const isPasswordValidated = await bcrypt.compare(plainPassword,user.password)

    if(!isPasswordValidated){
        throw { message : "Invalid password !! Please try again",statusCode : 401}
    }
    const userRole = user.role?user.role : "USER";
    //3. If the password is validated, create a token and return it
    const token = jwt.sign({email : user.email, id : user.id,role : userRole},JWT_SECRET,
        {expiresIn : JWT_EXPIRY}
    )//password is not stored as payload as it might be decoded and it might be exposed
    return token;
}
module.exports = {
    loginUser
}