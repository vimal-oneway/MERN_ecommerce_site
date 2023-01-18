const express = require("express");
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const path =require('path')
const cors = require('cors')

app.use(cors({
    methods:['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin:"http://localhost:5173",
    credentials:true
}));

app.use('/uploads/image/user',express.static('./uploads/image/user'))
app.use('/uploads/image/products',express.static(path.join(__dirname, './uploads/image/products')))
app.use(express.json());
app.use(cookieParser());
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order')
app.use('/api/v1/', products);
app.use('/api/v1/', auth);
app.use('/api/v1/',order);

app.use(errorMiddleware);

module.exports=app;