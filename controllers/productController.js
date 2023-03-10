const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require("../middlewares/catchAsyncError")
const APIFeatures = require('../utils/apiFeatures')
var multer  = require('multer')
var sharp = require('sharp')
var path =  require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/temp')
      },
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage:storage
})  

// !todo
// * send all product data -> /products
exports.getProducts = catchAsyncError( async (req, res, next) => {
    const apiFeatures = new APIFeatures(Product.find(),req.query);
    const results = await apiFeatures.search().filter().paginate(5);
    res.status(200).json({
        success: true,
        totalPage: results.totalPage,
        count: results.products.length,
        products: results.products
    })
})

// * Create new product -> /product/new
exports.newProduct =    catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id;
    const {name , price} = req.body;
    const imgPath = req.file.path; 
    const compressedImgPath = `/uploads/image/products/img_${Date.now()}.jpg`
    const useSharpPath = `./backend${compressedImgPath}`
    console.log(useSharpPath);
    sharp(imgPath)
        .resize(286, 180)
        .toFile(useSharpPath, function (err) {
            console.log(err);
        });
    req.body.images = [{image:compressedImgPath}];
    const newProductData = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product: newProductData
    })
})

// * send single product with id -> /api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
        const product = await Product.findById(req.params.id).populate({ path: 'reviews.user', model: 'User', select:'name email avatar'});

        if(!product)
        {
            return next(new ErrorHandler("Product not found", 400))
        }

        res.status(201).json({
            success: true,
            product
        })
})


// * update single product with id -> /api/v1/product/:id
exports.updateProduct = catchAsyncError( async (req, res, next) => {
        let product = await Product.findById(req.params.id);

        if(!product)
        {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        })

        res.status(201).json({
            success: true,
            product
        })
})

//* Delete Product -> /api/v1/product/:id
exports.deleteProduct = catchAsyncError( async (req, res, next) => {
        const product = await Product.findById(req.params.id);

        if(!product)
        {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }

        await product.remove();

        res.status(200).json({
            success: true,
            message:"product deleted successfully"
        })
}) 

// * Create Review - /review
exports.createReview = catchAsyncError(async(req, res, next) => {
    const { productId, rating, comment } = req.body;
    const review = {
        user : req.user.id,
        rating,
        comment
    }

    // * finding user review
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(review => {
       return review.user.toString() == req.user.id.toString() 
    })

    if(isReviewed)
    {
        product.reviews.forEach(review => 
        {
            if(review.user.toString() == req.user.id.toString())
            {
                review.comment = comment;
                review.rating = rating;
            }
        })
    }
    else
    {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    // * Average of products
     product.ratings = product.reviews.reduce((acc, review) =>{
        return Number(review.rating) + Number(acc);
    }, 0);
    product.ratings /= product.reviews.length;

    product.ratings = isNaN(product.ratings)?0:product.ratings;

    await product.save({validateBeforeSave:false});

    res.status(200).json({success:true});
})

// * get Reviews - /reviews?id={productId}
exports.getReviews = catchAsyncError(async(req, res, next) => {
    const product = await Product.findById(req.query.productId);

    res.status(200).json({
        success:true,
        reviews: product.reviews
    })
})

// * delete Review 
exports.deleteReview = catchAsyncError(async(req, res, next)=>{
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review => {
        review._id.toString() !== req.query.id.toString() 
    });

    const numOfReviews = reviews.length;

    // * Average of products
    let ratings = reviews.reduce((acc, review) =>{
        return Number(review.rating) + Number(acc);
    }, 0) / reviews.length;

    ratings = isNaN(ratings)?0:ratings;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews, 
        numOfReviews, 
        ratings
    })

    res.status(200).json({success:true})
})