import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { act } from 'react'


export const saveUserToFile = createAsyncThunk(
    'users/saveUserToFile',
    async(userData, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers : {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            const result = await response.json()
            return result
         
            
        } catch (error) {

            return thunkAPI.rejectWithValue('Failed to save user')
            
        }
    }
)

export const getUser = createAsyncThunk(
    'users/getUser',
    async(_, thunkAPI) => {
        try {
            const response = await fetch('http://localhost:5000/api/users')
            const res = await response.json()
            return res
        } catch (error) {
            return thunkAPI.rejectWithValue('User not fetched')
        }
    }
)




const initialState = {
   
    id: '',
    name: '',
    email: '',
    password:''
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // addUser : (state, action) => {
        //     state.id = Date.now();
        //     state.name = action.payload.name;
        //     state.email = action.payload.email;
        //     state.password = action.payload.password;
        // },
        logoutUser: (state) => {
            state.id = '';
            state.name = '';
            state.email = '';
            state.password = '';
            localStorage.removeItem('user'); 
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(saveUserToFile.pending, (state) => {
            console.log('Saving user..');
            
        })
        .addCase(saveUserToFile.fulfilled, (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
            
        })
        .addCase(saveUserToFile.rejected, (state, action) => {
            console.log('User is not saved', action.payload);
            
        })
        .addCase(getUser.pending, (state) => {
            console.log('Fetching user..');
            
        })
        .addCase(getUser.fulfilled, (state, action) => {
           const users = action.payload

        //    const loggedInUser = users.find
            console.log(users);
            
            
        })
        .addCase(getUser.rejected, (state, action) => {
            console.log('User Fetching failed', action.payload);
            
        })
    }
})

export const {addUser, logoutUser} = userSlice.actions
export default userSlice.reducer

