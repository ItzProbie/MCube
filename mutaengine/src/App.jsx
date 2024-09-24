import { useState } from 'react'
import './App.css'
import {BrowserRouter , Routes,Route, Navigate} from 'react-router-dom'
import GoogleLogin from './pages/GoogleLogin'
import Dashboard from './pages/Dashboard'
import { GoogleOAuthProvider } from '@react-oauth/google'
import UserPage from './pages/UserPage'
import Payment from './pages/Payment'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/forgotPassword'
import ResetPassword from './pages/resetPassword'

function App() {

  console.log(import.meta.env.VITE_CLIENT_ID)


  return (
    <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
    <BrowserRouter>
    <Routes>
      <Route path = '/signup' element={<GoogleLogin/>}/>
      <Route path ='/google-login-signup' element={<GoogleLogin/>}/>
      <Route path= '/' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signin' element={<SignUp/>}/>
      <Route path= '/user' element={<UserPage/>}/>
      <Route path= '/payment' element={<Payment/>}/>
      <Route path= '/forgot-password' element={<ForgotPassword/>}/>
      <Route path= '/update-password/:token' element={<ResetPassword/>}/>
    </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
    </>
  )
}


export default App
