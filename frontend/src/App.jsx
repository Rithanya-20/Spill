import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './Pages/Login/Login'
import { ThemeContextProvider } from './Theme/ThemeContext'
import Home from './Pages/Home/Home'
import {Provider} from 'react-redux'
import Store from './app/store/Store'
import Comments from './Pages/Comments/Comments'
function App() {


  return (
    <>
   <Provider store={Store}>
    <ThemeContextProvider>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
       <Route path='/signin' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
       {/* <Route path='/comments' element={<Comments/>}/> */}
    </Routes>
    </BrowserRouter>
    </ThemeContextProvider>
    </Provider>
    </>
  )
}

export default App
