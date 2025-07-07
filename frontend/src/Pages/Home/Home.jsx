import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../Components/Input/Input';
import './Home.css'
import Button from '../../Components/Button/Button';
// import { addPost } from '../../app/feature/postSlice';
import Post from '../Post/Post';
import { savePostInFile } from '../../app/feature/postSlice';
import logo from '../../../public/spill.png'
import logout from '../../../public/logout.png'
import signin from '../../../public/Login.png'

import bg from '../../../public/bg.png'
import { logoutUser } from '../../app/feature/userSlice';
import { useNavigate } from 'react-router-dom';

function Home() {
const navigate = useNavigate()
 const user = useSelector(state => state.users)
//  const post = useSelector(state => state.posts.posts)
 const dispatch = useDispatch()
 const [isForm, setIsForm] = useState({
    title : '',
    post: '',
    userId: '',
    postId: '',
    date: ''
 })

// console.log(user.id); 
//  console.log(post);


 

 const submitPost = (e) => {
    e.preventDefault()
    // console.log(isForm); 
    const completePost = {
        ...isForm,
        userId : user.id,
        userName: user.name,
        postId : Date.now(),
        date : new Date().toLocaleString("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
}),
        like: 0,
        isLike: false,
        dislike: 0,
        isDislike: false,
        comments :[]        
    }  
    
    // console.log(completePost);
    
    // dispatch(addPost(completePost)) 
    dispatch(savePostInFile(completePost))

    alert('Posted!')
    window.location.reload();
    
 }


 const fieldHandler = (e) => {
    setIsForm(prev => (
        {
            ...prev,
            [e.target.name] : e.target.value
           
        }
    )
    )
 }

const handleLogout = () => {
  
   dispatch(logoutUser())
   navigate('/')
}
 
 
  return (
    <>
<div className='header'>
        <img src={logo} width={100}/>
         {
            user.name !== "" ? (        <img src={logout} width={100} onClick={() => handleLogout()} style={{cursor: 'pointer'}} className='logout-section'/>
) : (        <img src={signin} width={100} onClick={() => navigate('/signin')} style={{cursor: 'pointer'}} className='logout-section'/>
) 
        }

    </div>
    
  <div className='partition' style={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat:'repeat-y',
            width: '100%',
            backgroundPosition: 'center',
            backgroundSize: 'contain'
          

        }}>
    
    <div className='post-section'>
        <div className='headline'>
            <p className='name'>Hey <b>{user.name}!👋😄</b> </p>
        <p>Is it a thought... or is it gossip in disguise?😏
        </p>
        <p>Come on <span className="pulse-highlight">SPILL. a post-Tea now😉☕</span></p>
        
        {
            user.name !== "" ? (<></>) : (<Button onClick={() => navigate('/signin')}>SIGN IN</Button>) 
        }
        
        
        </div>
        {
            user.name !== "" ? ( <form onSubmit={(e) => submitPost(e) }>
            <Input 
            type='text'
            name='title'
            placeholder='Title...' 
            value={isForm.title}
            onChange={(e) => fieldHandler(e)}/>

            <textarea 
            rows={5}
            name='post'
            placeholder='Post...' 
            value={isForm.post}
            onChange={(e) => fieldHandler(e)}/>

            <Button type="submit">POST</Button>


        </form>) : (<></>)

        }
       
    </div>

    <Post className='posted-section'  />

   </div>

    </>
  )
}

export default Home