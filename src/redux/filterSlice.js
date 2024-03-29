import { createSlice } from "@reduxjs/toolkit";

const filterSlice=createSlice({
    name:'filter',
    initialState:{filterProducts:[],searchvalue:''},
    reducers:{
        FILTER_BY_SEARCH(state,action){
            let {products,search}=action.payload
            if(search != ''){
                const filter=products.filter(item=>item.name.includes(search) || item.category.includes(search))
                state.filterProducts=filter
            }
            else {state.filterProducts=products}
            state.searchvalue=search
        },
        FILTER_BY_CATEGORY(state,action){},
        FILTER_BY_PRICE(state,action){}

    }
})

export const {FILTER_BY_CATEGORY,FILTER_BY_PRICE,FILTER_BY_SEARCH}=filterSlice.actions
export default filterSlice.reducer

export const selectFilterProducts=state=>state.filter.filterProducts
export const selectSearch=state=>state.filter.searchvalue