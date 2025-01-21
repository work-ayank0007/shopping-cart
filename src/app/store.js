import { configureStore } from '@reduxjs/toolkit'
import  cartSlice  from './Slice/cartSlice'

export default configureStore({
  reducer: {
    cart:cartSlice
  }
})