import React, { useEffect, useState } from 'react'
import ThemeContext from '../../Theme/ThemeContext'
import './Login.css'
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { saveUserToFile } from '../../app/feature/userSlice';
// import { addUser } from '../../app/feature/userSlice';
import { getUser } from '../../app/feature/userSlice';
import bg from '../../../public/bg.png'
import logo from '../../../public/spill-signIn.png'




function Login() {
 const navigate = useNavigate()
//  const {dark, darktheme} = useContext(ThemeContext)
 const dispatch = useDispatch()
 const [isForm, setIsForm] = useState({
    name: '',
    email: '',
    password: ''
 })

//  console.log(dark);

 const loginHandler = (e) => {
    e.preventDefault()
  
  //  dispatch(addUser(isForm))

  

   dispatch(saveUserToFile({...isForm, id: Date.now()}))
   navigate('/home')
 }

 const inputField = (e) => {
    setIsForm(prev => ({
        ...prev,
        [e.target.name] : e.target.value
    }))
 }

 useEffect(()=>{
  dispatch(getUser())
 }, [])
 

 
  return (
    <div className='container' style={{
                backgroundImage: `url(${bg})`,
                backgroundRepeat:'repeat-y',
                width: '100%',
                backgroundPosition: 'center',
                backgroundSize: 'contain'
              
    
            }}>
        <div className='wrapper'>
           <img src={logo} width={200}/>
            <p style={{textAlign: 'center', fontSize: '14px', marginBottom: '30px'}}>Your thoughts deserve the spot-tea-light!</p>
            
            <p>Sign Up</p>
            <form onSubmit={(e) => loginHandler(e)}>
                 
                <Input 
                type='text' 
                placeholder='Name...'
                name='name'
                value={isForm.name}
                onChange={inputField}
                />

                <Input
                type='email'
                placeholder='Email@email.com'
                name='email'
                value={isForm.email}
                onChange={inputField}
                />

                <Input 
                type='password' 
                placeholder="Password..."
                name='password'
                value={isForm.password}
                onChange={inputField}
                />

                

                <Button type="submit">SIGN UP</Button>


            </form>   
        </div>
    </div>
  )
}

export default Login