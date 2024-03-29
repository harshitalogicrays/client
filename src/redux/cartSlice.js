import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice=createSlice({
    name:"cart",
    initialState:{cartItems:[],total:0,redirectURL:''},
    reducers:{
        ADD_TO_CART(state,action){
            const itemIndex=state.cartItems.findIndex((item)=>item.id==action.payload.id)
            if(itemIndex==-1){
                //add
                    state.cartItems=[...state.cartItems,{...action.payload,cartQuantity:1}]
                    toast.success(`${action.payload.name} added to cart`)
                    window.scrollTo(0,0)
            }
            else {
                //increase 
                if(state.cartItems[itemIndex].cartQuantity < action.payload.stock){
                    state.cartItems[itemIndex].cartQuantity++
                    // toast.success(`${action.payload.name} increase by 1 to cart`)
                }
                else 
                toast.info(`${action.payload.stock} qty available`)
            }
        },
        DECREASE(state,action){
            const itemIndex=state.cartItems.findIndex((item)=>item.id==action.payload.id)
            if(state.cartItems[itemIndex].cartQuantity  > 1){
                state.cartItems[itemIndex].cartQuantity--
            }
        },
        REMOVE_FROM_CART(state,action){
            let filtercart=state.cartItems.filter((item)=>item.id!=action.payload.id)
            state.cartItems=filtercart
        },
        EMPTY_CART(state,action){
            state.cartItems=[];state.total=0
        },
        CALCULATE_TOTAL(state,action){
            let t= state.cartItems.reduce((prev,item)=>{return prev +=(item.cartQuantity * item.price)},0)
            state.total=t  },
        SAVE_URL(state,action){
            state.redirectURL=action.payload }
    }
})

export const {ADD_TO_CART,DECREASE,REMOVE_FROM_CART,EMPTY_CART,CALCULATE_TOTAL,SAVE_URL}=cartSlice.actions
export default cartSlice.reducer
export const selectCartItems=state=>state.cart.cartItems
export const selectTotalAmount=state=>state.cart.total
export const selectURL=state=>state.cart.redirectURL