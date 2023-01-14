import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:'products',
    initialState:{
        loading: false
    },
    reducers: {
        productRequest(state, action){
            return {
                loading:true,
            }
        },
        productSuccess(state, action){
            return {
                loading: false,
                product: action.payload.product,
                success: action.payload.success,
            }
        },
        productFail(state, action){
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