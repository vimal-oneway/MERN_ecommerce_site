const mongoose  = require('mongoose')

const orderSchema = {
    shippingInfo:{
        address:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        phoneNo:{
            type:String,
            required:true
        },
        postalCode:{
            type:String,
            required:true
        },
    },
    user: {
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'User'
    },
    orderItems:[{
        name:{
            type:String,
            required:true
        }, 
        quantity:{
            type:Number,
            required:true
        }, 
        price:{
            type:Number,
            required:true
        },
        product:{
            type: mongoose.SchemaTypes.ObjectId,
            required:true,
            ref:'Product'
        }, 
    }],
    itemsPrice: {
        type:Number,
        required:true,
        default:0.0
    },
    taxPrice: {
        type:Number,
        required:true,
        default:0.0
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0
    }, 
    paidAt: {
        type:Date
    },
    deliveriedAt: {
        type:Date
    },
    orderStatus: {
        type:String,
        required:true, 
        default:'Processing'
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
}

let orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;