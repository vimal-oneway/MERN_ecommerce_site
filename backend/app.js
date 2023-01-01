const express = require("express");
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');
const cors = require('cors')

app.use(cors({
    methods:['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());
const products = require('./routes/product');
const auth = require('./routes/auth');

app.use('/api/v1/', products);
app.use('/api/v1/', auth);

app.use(errorMiddleware)

module.exports=app;