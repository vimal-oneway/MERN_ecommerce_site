import axios from "axios";
import { productsFail, productsRequest, productsSuccess } from "../slices/productsSlice";

export const getProducts = async (dispatch,priceQuery, page) => 
{
    try 
    {
        dispatch(productsRequest());
        const {data}  = await axios.get(`/api/v1/products?page=${page}${priceQuery}`);
        dispatch(productsSuccess(data));
    } 
    catch (error) 
    {
        dispatch(productsFail(error.response.data));
    }
}