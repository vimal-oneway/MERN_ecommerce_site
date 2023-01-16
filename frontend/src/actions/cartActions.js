import axios from "axios";
import { cartFail, cartRequest, cartSuccess, cartDelete, cartQuantity } from "../slices/cartSlice";

export const getCart = async (dispatch) => 
{
    try 
    {
        dispatch(cartRequest());
        const {data}  = await axios.get(`/api/v1/cart`);
        dispatch(cartSuccess({data}));
    } 
    catch (error) 
    {
        dispatch(cartFail(error.response));
    }
}  

export const setQuantity = async (dispatch, quantity, productId) => 
{
    try {
        dispatch(cartRequest());
        const {data} = await axios.post(`/api/v1/cart`, {quantity, productId});
        dispatch(cartQuantity(data));
    }
    catch (error) {
        dispatch(cartFail(error.response.data))
    }
}

export const deleteProduct = async (dispatch, productId) => 
{
    try {
        dispatch(cartRequest());
        const {data} = await axios.delete(`/api/v1/cart`, {data:{
            productId
        }});
        dispatch(cartDelete(data));
    }
    catch (error) {
        dispatch(cartFail(error.response.data))
    }
}