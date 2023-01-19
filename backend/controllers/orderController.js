const catchAsyncError = require('../middlewares/catchAsyncError')
const Order = require('../models/orderModel');
const ErrorHandler = require('../utils/errorHandler');
const Product = require('../models/productModel');
const stripe = require('stripe')("sk_test_51MR6qYSJ0awuaLMldPSxcG0P3ko73G4eHmNk5TMsEWmvMdUjWeIFja4OYFM6BcZoqjdwpW4xxRae6FHbWJsgxANq00W2xpsD5v")


// * Create new order - api/v1/order/new
exports.newOrder = catchAsyncError(async(req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxtPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxtPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(), 
        user:req.user.id
    })

    res.status(200).json({success:true, order})
})

// * Get single Order - order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if(!order)
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`,404));

    res
        .status(200)
        .json({success:true, order});
})

// * Get Loggedin user order - /myorders
exports.getUserOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({user: req.user.id});

    if(!orders)
        return next(new ErrorHandler(`Orders not found `,404));

    res
        .status(200)
        .json({success:true, orders});
})

// * Admin: get all orders - orders
exports.orders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order)=> {
        totalAmount += order.totalPrice;
    })

    res
        .status(200)
        .json({success:true, totalAmount, orders});
})

// * Admin: update order - order/:id
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('Order has been already delivered ', 400));
    }

    order.orderItems.forEach(async (orderItem) => {
        await updateStock(orderItem.product, orderItem.quantity)
    })

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();

    res
        .status(200)
        .json({success:true});
})

async function updateStock(productId, quantity)
{
    const product = await Product.findById(productId);
    product.stock = product.stock - quantity;
    product.save({validateBeforeSave:false});
}

// * Admin: Delete Order - 
exports.deleteOrder = catchAsyncError(async(req,res, next) => {
    const order = await Order.findById(req.params.id);

    if(!order)
    {return next(new ErrorHandler('order was not found',400))}

    await order.remove();

    res.status(200).json({success:true});
})

// * payment 
exports.setPayment = catchAsyncError(async (req, res, next) => {
    console.log(req.body.product, req.body.token);
    const {product, token} = req.body
    try {
      let {status} = await stripe.charges.create({
        amount: parseFloat(product.price),
        currency: 'usd',
        source: token?.id,
      });   
      console.log("status/n", status);
      res.json({status});
    } catch (err) {
      res.status(500).end();
    }
});
  

//     const {product} = req.body
//     stripe.customers.create({
//         name: req.user.name,
//         email: req.user.email,
//         source: req.body.token.id
//     }).then(customer => stripe.charges.create({
//         amount: parseInt(product.price) * 100,
//         currency: 'usd',
//         customer: customer.id,
//         description: 'Thank you for your generous donation.'
//     })).then((res) => console.log(res))
//         .catch(err => console.log(err))
// })

// app.post('/charge', async (req, res) => {
// const YOUR_DOMAIN = 'http://localhost:5173'

// exports.setPayment = catchAsyncError(async (req, res, next) => {
//     const {product} = req.body;
//     console.log(product);

//     let stripeProduct = await stripe.products.list({
//         limit:1,
//         active:true,
        
//     });
//     console.log(stripeProduct);

//     stripeProduct = stripeProduct.data[0];
//     console.log(stripeProduct);

//     if(!stripeProduct)
//     {
//         stripeProduct = await stripe.products.create({
//             name:product.name,
//             type:'service',
//         });
//     }

//     console.log(stripeProduct);
//     const price = await stripe.prices.create({
//         unit_amount: parseFloat(product.price),
//         currency:'inr',
//         product: product._id
//     })
//     const session = await stripe.checkout.sessions.create({
//         line_items: [
//           {
//             price: price,
//             quantity: 1,
//           },
//         ],
//         mode: 'payment',
//         success_url: `${YOUR_DOMAIN}?success=true`,
//         cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//     }).then(r=>console.log(r)).catch(e => console.log(e));
//     console.log(session.url);
//     res.redirect(302, session.url);
//     //   res.redirect(303, session.url);
// })