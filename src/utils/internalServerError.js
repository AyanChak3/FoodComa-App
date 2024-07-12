const AppError = require('./appError')
class InternalServerError extends AppError{
    constructor(){
       super(`It's not you. It's our server where something went wrong`,500);
    }
}
module.exports = InternalServerError;