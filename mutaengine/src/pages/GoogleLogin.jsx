/* eslint-disable no-unused-vars */
import React from 'react'
import {useGoogleLogin} from '@react-oauth/google'
import { googleAuth } from '../api'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
    const navigate = useNavigate();
  
        const responseGoogle = async (authRes) => {
        try{
            console.log("google");
            console.log(authRes)
            if(authRes['code']){
                console.log(authRes['code']);
            
              const result = await googleAuth(authRes['code']);
              console.log("Result is here : " , result);
              
              const {email, name, image , accountType} = result.data;
              const token = result.data.token;
              
              const obj = {               
                token , accountType};
                localStorage.setItem('accountType' , obj.accountType);
                localStorage.setItem('token', obj.token);
                // console.log(result.data) 
                navigate('/user')
            }
          }catch(error){
                console.log(error)
            }
        }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow : 'auth-code'
    });    

  return (
    <div>
        <button onClick={googleLogin}>
          <FcGoogle/><br/>
            Login With Google
        </button>
    </div>
  )
}

export default GoogleLogin