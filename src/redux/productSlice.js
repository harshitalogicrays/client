import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    name:"product",
    initialState:{products:[]},
    reducers:{
        store_products(state,action){
            state.products=action.payload
        }
    }
})
export const {store_products} =productSlice.actions
export default productSlice.reducer
export const selectproducts=state=>state.product.products