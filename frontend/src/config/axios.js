import axios from "axios";
axios.defaults.withCredentials=true;

export default class Axios 
{
    static url = "http://localhost:8080";
    constructor()
    {
        this.options={
            mode:'no-cors',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
        };
    }

    static async getUser(){
        const userData = await axios.get('/api/v1/myprofile'
        ,this.options)
        .then((res)=>{
            return res.data.user
        })
        .catch(e=>console.log(e))
        return userData
    }
    
    static async loginUser (info) {
        return await axios.post(`http://localhost:8080/api/v1/login`,info)
        .then((res)=>{
            return res.data;
        })
        .catch((e)=>{
            return e.response.data;
        })
    }

    static async registerUser(info){
        console.log('hi form loginUser',info);
        const data =  await axios.post(`${this.url}/api/v1/register`,info
        ,this.options)
        .then((res)=>{
            console.log(res);
            return res.data;
        })
        .catch((e)=>{
            console.log(e);
            return e.response.data
        })
        return data;
    }

    static async getAllProductData(page,priceQuery){
        console.log(page, "price range", priceQuery);
        const productData = await axios.get(`http://localhost:8080/api/v1/products?page=${page}${priceQuery}`
        ,this.options)
            .then((res)=>{
                return res.data
            })
            .catch((e)=>{
                return e.response.data
            }) 
        return productData
    }

    static async getProductDataById(loc){
        const productData = await axios.get(`http://localhost:8080/api/v1${loc}`
        ,this.options)
        .then((res)=>{
            return res.data
        })
        .catch((e)=>{
            return e.response.data
        })
        return productData;
    }


    static async getProductData(category){
        const productData = await axios.get(`http://localhost:8080${category}`,this.options)
        .then((res)=>{
            return res.data
        })
        .catch((e)=>{
            return res.response.data
        })
        return productData
    }

    static async productRegister(info){
        const config = {     
            mode:'no-cors',
            headers: { 'content-type': 'multipart/form-data' }
        }
        console.log("hi",info);
        // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        // const userData = await axios.post('http://localhost:8080/api/v1/product/new',info, config)
        const userData = await axios.post('http://localhost:8080/api/v1/product/new',info, config)
        .then((res)=>{
            console.log(res.data);
            return res.data;
        })
        .catch((e)=>{
            console.log(e);
        })
        return userData
    }

    static async setCartQuantity(isAdd, userId, productId)
    {
        console.log("hi");
        const data = await axios.post("http://localhost:8080/user/setCartQuantity", {userId:userId, productId:productId,isAdd:isAdd})
        .then((res)=>{
            console.log(res.data);
            console.log("hello");
            return res.data;
        })
        .catch((err)=>{
            console.log(err);
        })
        return data
    }

    static async addToCart(userId, productId)
    {
        console.log("hi");
        const addCart = await axios.post("http://localhost:8080/user/cart", {userId:userId, productId:productId})
        .then((res)=>{
            console.log(res.data);
            return res.data;
        })
        .catch((err)=>{
            console.log(err);
        })
        return addCart
    }

    static async delCart (userId, productId)
    {
        console.log("hi");
        console.log(userId, productId);
        const data =await  axios.post("http://localhost:8080/user/delCart", {userId:userId, productId:productId})
        .then((res)=>{
            console.log(res.data);
            return res.data;
        })
        .catch((err)=>{
            console.log(err);
        })
        return data
    }

    static async getCart(userId)
    {
        const cartData = await axios.post("http://localhost:8080/user/getCart", {userId:userId, userData:userId})
        .then((res)=>{
            return res.data;
        })
        .catch((err)=>{
            console.log(err);

        })
        return cartData;
    }

    static async setVerify(otp, email)
    {
        const data = await axios.post("http://localhost:8080/user/verify", {otp:otp,email:email})
        .then((res)=>{
            return res.data;
        })
        .catch((err)=>{
            console.log(err);

        })
        return data
    }

    static async setLogOut()
    {
        await axios.get("http://localhost:8080/api/v1/logout", {})
        .then((res)=>{
            console.log(res.data);
            return res.data;
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    static async forgotPassword(email)
    {
        const data = await axios.post("http://localhost:8080/user/forgotPassword/sendOtp", {email:email}, this.options)
        .then((res)=>{
            console.log(res.data);
            return res.data;
        })
        .catch((err)=>{
            console.log(err);
        })
        return data
    }

    static async setPassword(url, password)
    {
        const data = await axios.post(`http://localhost:8080/${url}`, {password:password}, this.options)
        .then((res)=>{
            console.log(res.data);
            return res.data;
        })
        .catch((err)=>{
            console.log(err);
        })
        return data
    }
}