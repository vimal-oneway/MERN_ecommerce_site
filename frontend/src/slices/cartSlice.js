import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        loading: false
    },
    reducers: {
        cartRequest(state, action) {
            return {
                loading: true,
            }
        },
        cartSuccess(state, action) {
            return {
                ...state,
                loading: false,
                cart: action.payload.data,
            }
        },
        cartFail(state, action) {
            return {
                loading: false,
                error: action.payload
            }
        },
        cartDelete(state, action) {
            return {
                loading:false,
                cart:action.payload
            }
        },
        cartQuantity(state, action){
            return{
                loading:false,
                cart:action.payload
            }
        },
        cartAdd(state, action){
            return{
                loading:false
            }
        }
    }
});

const { actions, reducer } = cartSlice;

export const { cartFail, cartSuccess, cartRequest, cartDelete, cartQuantity, cartAdd } = actions;

export default reducer;