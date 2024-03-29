import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice=createSlice({
    name:"checkout",
    initialState:{shippingAddress:[]},
    reducers:{
        store_shippingaddress(state,action){
            state.shippingAddress=action.payload
        }
    }
})
export const {store_shippingaddress} =checkoutSlice.actions
export default checkoutSlice.reducer
export const selectShippingAddress=state=>state.checkout.shippingAddress