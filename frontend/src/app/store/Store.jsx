import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../feature/userSlice'
import postReducer from '../feature/postSlice'
import activityReducer from '../feature/activitySlice'

const loadState = () => {
    try {
        const serialized = localStorage.getItem('user')
        return serialized ? {users: JSON.parse(serialized)} : undefined
        
    } catch (error) {
        return undefined
        
    }
}

const Store = configureStore({
    reducer : {
       users : userReducer,
       posts: postReducer,
       activities: activityReducer
    },
    preloadedState: loadState()
})

Store.subscribe(()=> {
    try {
        const state = Store.getState()
        if(state.users){
        localStorage.setItem('user', JSON.stringify(state.users))

        }else{
            localStorage.removeItem('user');
        }
        
    } catch (error) {
        //        
    }
})

// export const userState = (state) => state.users.user

export default Store

