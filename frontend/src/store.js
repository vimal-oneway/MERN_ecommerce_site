import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import productsReducer from './slices/productsSlice'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'
const reducer = combineReducers({
  productsState: productsReducer,
  productState: productReducer,
  cartState: cartReducer
})

export default configureStore({
  reducer,
  middleware:[thunk]
})