class UserService{
    constructor(_userRepository){
        //in the argument we will expect userRepository object
        this.userRepository = _userRepository
    }
    async registerUser(userDetails){
        //It will create a brand new user to the database
        //1. We need to check if the user with this email and mobile number exists or not
        const user = await this.userRepository.findUser({
            email : userDetails.email,
            mobileNumber : userDetails.mobileNumber
        })

        if(user){
            //we found an user
            throw {reason : "User with given email and mobile number already exists",statusCode : 400}
        }
        //2. If not,then create the user in the database
        const newUser = await this.userRepository.createUser({
            email : userDetails.email,
            password : userDetails.password,
            firstName : userDetails.firstName,
            lastName : userDetails.lastName,
            mobileNumber : userDetails.mobileNumber
        })
        if(!newUser){
            throw {reason:'Something went wrong,cannot create user',statusCode : 500}
        }
        //3. Return the detailsof created user
        return newUser;
    }
}
module.exports = UserService;