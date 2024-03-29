import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import categorySlice from "./categorySlice";
import sliderSlice from "./sliderSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";
import checkoutSlice from "./checkoutSlice";
import filterSlice from "./filterSlice";
import orderSlice from "./orderSlice";

const store=configureStore({
    reducer:{
        auth:authSlice,category:categorySlice,
        slider:sliderSlice,product:productSlice,
        cart:cartSlice,
        checkout:checkoutSlice,
        filter:filterSlice,
        order:orderSlice
    }
})

export default store