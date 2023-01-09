const catchAsyncError = require("../middlewares/catchAsyncError");
const User =  require('../models/userModel'); 
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwt");
const sendEmail = require('../utils/email');
const crypto = require('crypto')

// * api/v1/register
exports.registerUser = catchAsyncError(async(req, res, next) => {
    const {email, name, password, avatar} = req.body;
    
    if(!email || !password || !name ){
        return next(new ErrorHandler("Please enter email & password & name", 400));
    }

    const user = await User.create({
        name,
        email,
        password,
        avatar
    });

    sendToken(user, 201, res);
})

// * api/v1/login
exports.loginUser = catchAsyncError(async(req, res, next) => {
    const {email,password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please enter email & password", 400));
    }

    const user = await User.findOne({email}).select('+password');
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 201, res);
})

// * api/v1/logout
exports.logoutUser = catchAsyncError(async(req, res, next) => {
    res
        .cookie("token",null,{
            expires: new Date(Date.now()),
            httpOnly:true
        })
        .status(200)
        .json({
            success:true,
            message:"Logout successfully"
        });
})



// * api/v1//password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next)=>{
    const user = await User.findOne({email:req.body.email})
    if(!user){
        return next(new ErrorHandler("User not found with this email",404))
    }

    const resetToken = user.getResetToken();
    await user.save({validateBeforeSave:false});

    //* Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset url is as follows \n\n${resetUrl} \n\n If you have not requested this email, then ignore it`;

    try {
        sendEmail({
            email:user.email,
            subject:`Happy Shop Password Recovery`,
            message
        })

        res.status(200).json({
            success:true,
            message:`Email send to ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message, 500))
    }
})

// * api/v1//password/reset/:token
exports.resetPassword = catchAsyncError(async(req,res, next)=>{
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: {
            $gt : Date.now()
        }
    })

    if(!user){
        return next(new ErrorHandler("Password reset token is in invalid or expired",401))
    }

    if(req.body.password !== req.body.confirmPassword)
    {
        return next(new ErrorHandler("Password does not match",401))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    await user.save({validateBeforeSave:false});

    sendToken(user, 201, res);
})

// * api/v1/getUser
exports.getUser = catchAsyncError(async(req, res, next) => {
    res
        .status(200)
        .json({success:true,user:req.user});
})