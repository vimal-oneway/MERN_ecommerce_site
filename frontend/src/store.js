import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import productsReducer from './slices/productsSlice'

const reducer = combineReducers({
  productsState: productsReducer
})

export default configureStore({
  reducer,
  middleware:[thunk]
})