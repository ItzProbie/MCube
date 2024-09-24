import React, { useState } from 'react';
import { passwordForgot } from '../api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    // Handle the submit action here (e.g., call an API to send reset email)
    try{

        const res = await passwordForgot(email);
        console.log(res);
        

    }catch(err){
        alert(err.message);
    }
  };

  return (
    <div>
      <h3>Forgot Password</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={handleInputChange} 
          placeholder="Enter your email" 
          required 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
