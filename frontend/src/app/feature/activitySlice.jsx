import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    activities : []
}

export const postActivity = createAsyncThunk(
    'activities/postActivity',    
    async(postData, thunkAPI) => {
    
        try {
            const response = await fetch(`http://localhost:5000/api/users/${postData.userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
            const res = await response.json()
            return res
            
        } catch (error) {
            return thunkAPI.rejectWithValue('Activity cannot be posted')            
        }
      
    }
)


export const updateActivity = createAsyncThunk(
    'activities/updateActivity',    
    async(postData, thunkAPI) => {
    
        try {
            const response = await fetch(`http://localhost:5000/api/users/${postData.userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })
            const res = await response.json()
            return res
            
        } catch (error) {
            return thunkAPI.rejectWithValue('Activity cannot be posted')            
        }
      
    }
)

export const getActivity = createAsyncThunk(
    'posts/getActivity',
    async(_, thunkAPI) => {
        try {

            const response = await fetch('http://localhost:5000/api/users/activity' )

            const res = await response.json()
            return res
            
        } catch (error) {
            return thunkAPI.rejectWithValue('Posts are not fetched')
        }
    }
)


const activitySlice = createSlice({
    name: 'activities',
    initialState,
    reducers : {

    },
    extraReducers: (builder) => {
        builder
        .addCase(postActivity.pending, (state) => {
            console.log('Posting Activity pending');
            
        })
        .addCase(postActivity.fulfilled, (state, action) => {
            console.log('Posting Activity Fulfilled');
        })
        .addCase(postActivity.rejected, (state, action) => {
           console.log(action.payload);
           
        })
        .addCase(getActivity.fulfilled, (state, action) => {
            state.activities = action.payload
           
            
        })
        .addCase(updateActivity.pending, (state) => {
            console.log('Updating Activity pending');
            
        })
        .addCase(updateActivity.fulfilled, (state, action) => {
            const updated = action.payload
            const userIndex = state.activities.findIndex(u => u.userId === updated.userId)
            
            if(userIndex !== -1){
                state.activities[userIndex] = updated
            }
        })
        .addCase(updateActivity.rejected, (state, action) => {
           console.log(action.payload);
           
        })
    }
})

export default activitySlice.reducer