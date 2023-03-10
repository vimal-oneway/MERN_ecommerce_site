import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name:'products',
    initialState:{
        loading: false
    },
    reducers: {
        productsRequest(state, action){
            return {
                loading:true,
            }
        },
        productsSuccess(state, action){
            return {
                loading: false,
                products: action.payload.products,
                count: action.payload.count,
                success: action.payload.success,
                totalPage: action.payload.totalPage
            }
        },
        productsFail(state, action){
            return {
                loading: false,
                error: action.payload
            }
        }
    }
});

const {actions, reducer} = productsSlice;

export const {productsFail, productsRequest, productsSuccess} = actions;

export default reducer;