import React, { useState } from 'react';
import { resetPassword } from '../api';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { token } = useParams();

  const handleInputChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      if (password.length === 0) {
        alert("Please check your password.");
        return;
      }
      
      const response = await resetPassword({
        token: token, // Ensure token is defined
        password: password // Ensure password is defined
      });
      alert("password reset successfull");
      console.log(response);
      navigate('/login');

    } catch (err) {
      console.error('Error:', err);
      alert(err.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input 
          type="password" 
          value={password} 
          onChange={handleInputChange} 
          placeholder="Enter your new password" 
          required 
        />
        <button type="submit">Reset Password</button>   
      </form>
    </div>
  );
};

export default ResetPassword;
