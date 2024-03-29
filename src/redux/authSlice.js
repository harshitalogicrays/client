import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:"auth",
    initialState:{isLoggedIn:localStorage.getItem('isLoggedIn') ? true : false, userEmail:null, userName:null,userId:null,userRole:localStorage.getItem('role') ? localStorage.getItem('role'): null},
    reducers:{
        loginuser(state,action){
            let {userEmail,userName,userId,userRole}=action.payload
            state.isLoggedIn=true
            state.userEmail=userEmail
            state.userId=userId
            state.userName=userName
            state.userRole=userRole
            localStorage.setItem('isLoggedIn',state.isLoggedIn)
            localStorage.setItem('role',state.userRole)
        },
        logoutuser(state,action){
            state.isLoggedIn=false
            state.userEmail=null
            state.userId=null
            state.userName=null
            state.userRole=null
            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem('role')
        },
    }})

export const {loginuser,logoutuser}=authSlice.actions
export default authSlice.reducer

export const selectIsLoggedIn=state=>state.auth.isLoggedIn
export const selectUserEmail=state=>state.auth.userEmail
export const selectUserName=state=>state.auth.userName
export const selectUserRole=state=>state.auth.userRole
export const selectUserId=state=>state.auth.userId
