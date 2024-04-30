import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useState } from "react";

export const fetchUsers = createAsyncThunk('user/fetchUsers',async()=>{
    // try{
    //     let response = await axios.get('https://jsonplaceholder.typicode.co/users')
    //     return response.data;
    // }catch(err){
    //     console.log(err);
    //     return err;
    // }
    let response = await axios.get('https://jsonplaceholder.typicode.com/users')
    return response.data;

})

const userSlice = createSlice({
    name:'users',
    initialState:{
        users:[],
        loading:false,
        error:''
    },
    reducers: {
        // add the user
        userAdded(state, action) {
          state.users.push(action.payload);
        },
    
        // get the existing user details and then update with the current details
        userUpdated(state, action) {
        //   const { id, name, company } = action.payload; // form payload
          const existingUser = state.users.findIndex((user) => user.id === action.payload.id);
          if (existingUser) {
            state.users[existingUser]=action.payload;
          }
        },
    
        // delete user
        userDeleted(state, action) {
            const existingUser = state.users.find((user) => user.id === action.payload);
            if (existingUser) {
              state.users = state.users.filter((user) => user.id !==  action.payload);
            }
          },
      },    
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending, (state)=>{
            state.loading=true;
        });
        builder.addCase(fetchUsers.fulfilled, (state,action)=>{
            state.loading=false;
            state.users=[...state.users, ...action.payload];
        });
        builder.addCase(fetchUsers.rejected, (state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
})

export const {userAdded, userDeleted, userUpdated} = userSlice.actions; 
export default userSlice.reducer;
