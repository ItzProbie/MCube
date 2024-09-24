/* eslint-disable no-unused-vars */
import React,{useState , useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { sendOTP } from '../api'
import { signUp } from '../api'
import ReCAPTCHA from "react-google-recaptcha";

const SignUp = () => {
    const navigate = useNavigate();
    const [recaptchaValue, setRecaptchaValue] = useState('');
    const captchaRef = useRef()

    // eslint-disable-next-line no-unused-vars
  
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
  
    // State for validation errors
    const [errors, setErrors] = useState({});
  
    const handleGoogleSignIn = () => {
        navigate('/google-login-signup'); // Navigate to the desired route
    }

    // Simple validation rules
    const validate = () => {
      const newErrors = {};
      
      if (!email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email address is invalid';
      }
  
      if (!name) {
        newErrors.name = 'Name is required';
      }
  
      if (!password) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
  
      if (!otp) {
        newErrors.otp = 'OTP is required';
      } else if (otp.length !== 6) {
        newErrors.otp = 'OTP must be 6 digits';
      }
  
      return newErrors;
    };

    const onChange = value => {
      setRecaptchaValue(value);
    }
  
    const handleSubmit = async(e) => {
      e.preventDefault(); // Prevent form from submitting
      captchaRef.current.reset();

      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        setErrors({});
        console.log("csbnewkn");
        
        if(otp){
            
            const user = await signUp({
                email, userName: name, password, otp , recaptchaValue
            })
            console.log(user);
            if(user){
                localStorage.clear();
                navigate('/login');
            }
            

        }
      }
    };

    const sendotp = async(e)=>{
        e.preventDefault();
        const res = await sendOTP(email);
            console.log(res);
    }
  
    console.log(import.meta.env.VITE_SITE_KEY);
    

  return (
    <div>
        <h3>Sign In</h3>
         <form>
        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        <div>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name">Name</label>
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>

        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <button onClick={sendotp}>Send</button>

        <div>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <label htmlFor="otp">OTP</label>
          {errors.otp && <p style={{ color: 'red' }}>{errors.otp}</p>}
        </div>

        <div className='form-group mt-2'>
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_SITE_KEY}
            onChange={onChange}
            ref={captchaRef}
          />
        </div>

        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
      <button onClick={handleGoogleSignIn}>
            Sign In using Google
      </button>
    </div>
  )
}

export default SignUp;