import { createSlice } from "@reduxjs/toolkit";

const sliderSlice=createSlice({
    name:"slider",
    initialState:{sliders:[]},
    reducers:{
        store_sliders(state,action){
            state.sliders=action.payload
        }
    }
})
export const {store_sliders} =sliderSlice.actions
export default sliderSlice.reducer
export const selectsliders=state=>state.slider.sliders