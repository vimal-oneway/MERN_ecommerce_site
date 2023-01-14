import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        loading: false
    },
    reducers: {
        cartRequest(state, action){
            return {
                loading:true,
            }
        },
        cartSuccess(state, action){
            return {
                loading: false,
                product: action.payload.product,
                success: action.payload.success,
            }
        },
        cartFail(state, action){
            return {
                loading: false,
                error: action.payload
            }
        }
    }
});

const {actions, reducer} = productSlice;

export const {productFail, productRequest, productSuccess} = actions;

export default reducer;