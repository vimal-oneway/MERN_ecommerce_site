const express = require('express');

const 
    { 
        registerUser, 
        loginUser, 
        logoutUser, 
        forgotPassword, 
        resetPassword, 
        getUser, 
        changePassword,
        updateProfile,
        getAllUsers,
        getUserAdmin,
        updateUser,
        deleteUser,
        getUserCart,
        addToCart,
        deleteCart
    } = require('../controllers/authController');

const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/authenticate')

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router.route('/myprofile').get(isAuthenticatedUser, getUser);
router.route('/logout').get(logoutUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);

router.route('/password/change').put(isAuthenticatedUser, changePassword);
router.route('/update').put(isAuthenticatedUser, updateProfile);

router
    .route('/cart')
    .get(isAuthenticatedUser, getUserCart)
    .put(isAuthenticatedUser, addToCart)
    .delete(isAuthenticatedUser, deleteCart);

// * admin routes
router.route('/admin/users').get( isAuthenticatedUser, authorizeRoles('admin'), getAllUsers );
router.route('/admin/user/:id')
    .get( isAuthenticatedUser, authorizeRoles('admin'), getUserAdmin )
    .put( isAuthenticatedUser, authorizeRoles('admin'), updateUser )
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser)

module.exports = router; 