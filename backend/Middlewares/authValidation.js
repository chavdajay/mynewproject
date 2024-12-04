const joi = require('joi');
const { sendSuccess, sendError } = require("../utils/responseHandler");

const signupValidation = (req, res, next)=>{
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required(),
    });
    const {error} = schema.validate(req.body);
    if(error){
        return sendError(res, "Bad request", 400);
    }
    next();
}

const loginValidation = (req, res, next)=>{
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(100).required(),
    });
    const {error} = schema.validate(req.body);
    if(error){
        return sendError(res, "Bad request", 400);
        
    }
    next();
}
module.exports = {
    signupValidation,
    loginValidation
}