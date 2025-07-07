import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const savePostInFile = createAsyncThunk(
    'posts/savePostInFile',
    async(postData, thunkAPI) => {
        try {

            const response = await fetch('https://spill-r5k1.onrender.com/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(postData)

            })

            const res = await response.json()

            return res
            
        } catch (error) {
            return thunkAPI.rejectWithValue('Post is not created')
        }
    }
)


export const getFromPosts = createAsyncThunk(
    'posts/getFromPosts',
    async(_, thunkAPI) => {
        try {

            const response = await fetch('https://spill-r5k1.onrender.com/api/getPosts' )

            const res = await response.json()
            return res
            
        } catch (error) {
            return thunkAPI.rejectWithValue('Posts are not fetched')
        }
    }
)

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async(postData, thunkAPI) => {
        try {

            const response = await fetch(`https://spill-r5k1.onrender.com/api/posts/${postData.postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })

            const res = await response.json()
            return res
            
        } catch (error) {
            return thunkAPI.rejectWithValue("Update failed")
        }
    }
)

export const addComment = createAsyncThunk(
    'posts/addComment',
    async(postData, thunkAPI) => {
        try {

            const response = await fetch(`https://spill-r5k1.onrender.com/api/comment/${postData.postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            })

            const res = await response.json()
            return res
            
        } catch (error) {
            return thunkAPI.rejectWithValue("Update failed")
        }
    }
)

const initialState = {
    
    posts : []
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost : (state, action) => {
            state.posts.push(action.payload)
        }

       
    },

    extraReducers: (builder) => {
        builder
        .addCase(savePostInFile.pending, (state) => {
            console.log('Saving the Post');
            
        })
        .addCase(savePostInFile.fulfilled, (state, action) => {
            console.log('Post is saved');           
            
        })
        .addCase(savePostInFile.rejected , (state, action) => {
            console.log('Post not saved', action.payload);
            
        })
        .addCase(getFromPosts.pending, (state) => {
            console.log('Saving the Post');
            
        })
        .addCase(getFromPosts.fulfilled, (state, action) => {
            console.log('Post is saved');
            state.posts = action.payload
            
        })
        .addCase(getFromPosts.rejected , (state, action) => {
            console.log('Post not saved', action.payload);
            
        })
        .addCase(updatePost.fulfilled, (state, action) => {
            const updated = action.payload;
            const postIndex = state.posts.findIndex(p => p.postId === updated.postId);
            if (postIndex !== -1) {
                state.posts[postIndex] = updated;
            }
        })
        .addCase(addComment.fulfilled, (state, action) => {
            // const updated = action.payload;
            // const postIndex = state.posts.findIndex(p => p.postId === updated.postId);
            // if (postIndex !== -1) {
            //     state.posts[postIndex].comments = updated;
            // //    state.posts[postIndex].comments.push(updated)

            // //    console.log('After add comment' +JSON.stringify(state.posts[postIndex].comments));
               
            // }

          const { postId, comment, userId, userName } = action.payload;
  const postIndex = state.posts.findIndex(p => p.postId === postId);

  if (postIndex !== -1) {
    const post = state.posts[postIndex];

    const updatedPost = {
      ...post,
      comments: Array.isArray(post.comments)
        ? [...post.comments, { userId, userName, postId, comment }]
        : [{ userId, userName, postId, comment }]
    };

    // Replace the post in the array immutably
    state.posts[postIndex] = updatedPost;
  }

        })
    }
})

export const {addPost, updateLike} = postSlice.actions
export default postSlice.reducer