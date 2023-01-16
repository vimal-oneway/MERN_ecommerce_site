import {cartAdd, cartRequest, cartFail} from '../slices/cartSlice'
import axios from 'axios'
export const addToCart = async (dispatch, productId) => {
    try {
        console.log(productId);
        dispatch(cartRequest());
        const {data} = await axios.put('/api/v1/cart',{productId});
        dispatch(cartAdd(data));
    } catch (error) {
        dispatch(cartFail(error.response.data));
    }
}