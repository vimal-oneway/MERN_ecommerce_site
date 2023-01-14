import axios from "axios";
import { productFail, productRequest, productSuccess } from "../slices/productSlice";

export const getProduct = async (dispatch, path) => 
{
    try 
    {
        dispatch(productRequest());
        const {data}  = await axios.get(`/api/v1/${path}`);
        console.log("hi", path);
        dispatch(productSuccess(data));
    } 
    catch (error) 
    {
        dispatch(productFail(error.response.data));
    }
}  