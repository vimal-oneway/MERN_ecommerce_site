const catchAsyncError = require("../middlewares/catchAsyncError");
const User =  require('../models/userModel'); 
const ErrorHandler = require("../utils/ErrorHandler");
const sendToken = require("../utils/jwt");
const sendEmail = require('../utils/email');
const crypto = require('crypto');
const path = require("path");

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

// *change password
exports.changePassword  = catchAsyncError(async(req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    const {oldPassword, password} = req.body;
    if(! await user.isValidPassword(oldPassword))
    {
        return next(new ErrorHandler("Old password does not match", 401));
    }

    user.password = password;
    await user.save();
    res
        .status(200)
        .json({success:true, message:"password changed successfully"});
})

// * update profile
exports.updateProfile = catchAsyncError(async(req, res, next) => {
    const newUserData  = {
        name: req.body.name,
        email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new:true,
        runValidators:true,
    });

    // if(!user)
    // {
    //     return next(new ErrorHandler("Data invalid", 401));
    // }

    res
        .status(200)
        .json({success:true, message: 'Your profile updated successfully', user});
})

// * get user cart 
exports.getUserCart = catchAsyncError(async(req, res, next) => {
    const user = await User.findById(req.user._id).populate({ path: 'cart.product', model: 'Product', select:'name price description ratings images seller numOfReviews'})
 
    if(!user){
        return next(new ErrorHandler('Your cart is empty',404));
    }

    res.status(200).json({cart:user.cart})
})

// * add to cart 
exports.addToCart = catchAsyncError(async(req, res, next) => {
    const {productId, quantity} = req.body;
    const user =  await User.findById(req.user._id);
    
    const isExist = user.cart.find(obj => obj.product.toString() === productId);
    if(isExist)
    {
        res.status(400).json({success:false, message:'this product is already in your cart'});
        return;
    }

    user.cart.push({product:productId, quantity:quantity||1});
    user.save();
    res.status(200).json({user, success:true, message:'Product was added successfully'});
})

// * delete product in cart
exports.deleteCart = catchAsyncError(async (req, res, next) => {
    const {productId} = req.body;
    const user = await User.findById(req.user._id).select('cart');
    user.cart = user.cart.filter(obj => obj.product.toString() !== productId);
    await user.save()
    res.status(200).json({user})
})

// * change quantity 
exports.setQuantityCart = catchAsyncError(async (req, res, next) => {
    const {productId, quantity} = req.body;
    const user =  await User.findById(req.user._id);
    user.cart.forEach(obj => {
        if(obj.product.toString() == productId)
        {
            obj.quantity = quantity;
        }
    }); 
    await user.save();
    res.json({user})
})


// * Admin: Get All users 
exports.getAllUsers = catchAsyncError(async(req, res, next) => {
    const users = await User.find();
    res
        .status(200)
        .json({success:true, users})
}) 

// * Admin: Get Specific User - get /admin/user/:id
exports.getUserAdmin = catchAsyncError(async(req, res, next) => {
    const user = await User.findById(req.params.id);
     
    if(!user) {
        return next(new ErrorHandler(`User not found with this id:${req.params.id}`, 400))
    }

    res
        .status(200)
        .json({success:true, user})
})

// * Admin: update user - put /admin/user/:id
exports.updateUser = catchAsyncError(async(req, res, next) => {
    const newUserData  = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new:true,
        runValidators:true,
    });

    res
        .status(200)
        .json({success:true, message: 'User profile updated successfully', user});
})

// * Admin: Delete user - delete /admin/user/:id
exports.deleteUser = catchAsyncError(async(req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user)
    {
        return next(new ErrorHandler("user not found"))
    }
    await user.remove();
    res.status(200).json({success:true})
})

const getTotalPrice = (cart) => {
    let total;
    cart.forEach((obj)=> {
        total += obj.price;
    })
    return total;
}