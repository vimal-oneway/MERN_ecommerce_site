const express = require('express');
const { getProducts, newProduct, getSingleProduct, updateProduct, deleteProduct, createReview } = require('../controllers/productController');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate');
var multer  = require('multer')

var path =  require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './backend/uploads/temp')
      },
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage:storage
})  



router.route('/products').get(getProducts);

router
    .route('/product/new')
    .post(isAuthenticatedUser,  authorizeRoles("admin"), upload.single('image'),  newProduct);
    
router
    .route('/product/:id')
    .get(getSingleProduct)
    .put(updateProduct)
    .delete(deleteProduct);

router
    .route('/review')
    .put(isAuthenticatedUser, createReview);
    
module.exports = router;