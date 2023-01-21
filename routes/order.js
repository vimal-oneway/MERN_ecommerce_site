const express = require('express');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles} = require('../middlewares/authenticate');
const { 
    newOrder, 
    getSingleOrder, 
    getUserOrders, 
    orders, 
    updateOrder, 
    deleteOrder, 
    setPayment
} = require('../controllers/orderController');

router
    .route('/order/new')
    .post(isAuthenticatedUser, newOrder);

router
    .route('/order/:id')
    .get(isAuthenticatedUser, getSingleOrder);

router
    .route('/myorders')
    .get(isAuthenticatedUser, getUserOrders);

// * Admin routes
router
    .route('/orders')
    .get(isAuthenticatedUser, authorizeRoles('admin'), orders);

router
    .route('/order/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);

router
    .route('/payment')
    .post(isAuthenticatedUser, setPayment);

module.exports = router;