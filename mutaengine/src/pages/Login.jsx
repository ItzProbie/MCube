import React, { useState, useRef } from 'react';
import { login } from '../api';
import { useNavigate } from 'react-router-dom';
// import { signIn } from '../api'; // Assuming you have a signIn function
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
    const navigate = useNavigate();
    const [recaptchaValue, setRecaptchaValue] = useState('');
    const captchaRef = useRef();

    // const responseGoogle = async (authRes) => {
    //     try {
    //         if (authRes['code']) {
    //             const result = await googleAuth(authRes['code']);
    //             const { email, name, image, accountType } = result.data;
    //             const token = result.data.token;
    //             const obj = { email, name, image, token, accountType };
    //             localStorage.setItem('userInfo', JSON.stringify(obj));
    //             localStorage.setItem('token', token);
    //             navigate('/user');
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // const googleLogin = useGoogleLogin({
    //     onSuccess: responseGoogle,
    //     onError: responseGoogle,
    //     flow: 'auth-code'
    // });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleGoogleLogIn = () => {
        navigate('/google-login-signup'); // Navigate to the desired route
    }
   
    const validate = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        return newErrors;
    };

    const onChange = value => {
        setRecaptchaValue(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        captchaRef.current.reset();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            const user = await login({ email, password, recaptchaValue });
            if (user) {
                // console.log(user.data)
                localStorage.clear();
                localStorage.setItem('token' , user.data.token)
                localStorage.setItem('accountType' , user.data.accountType)
                navigate('/user');
            }
        }
    };

    return (
        <div>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
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
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>

                <div className='form-group mt-2'>
                    <ReCAPTCHA
                        sitekey={import.meta.env.VITE_SITE_KEY}
                        onChange={onChange}
                        ref={captchaRef}
                    />
                </div>

                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
            <button onClick={handleGoogleLogIn}>
                Log In using Google
            </button>
        </div>
    );
};

export default Login;
