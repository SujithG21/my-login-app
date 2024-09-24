import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import './LoginForm.css';

const LoginForm = () => {
    const [isActive, setIsActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [signUpName, setSignUpName] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    
    const navigate = useNavigate();  

    const toggleSignUp = () => {
        setIsActive(true);
    };

    const toggleSignIn = () => {
        setIsActive(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: signUpName, 
                email: signUpEmail, 
                password: signUpPassword
            }),
        });

        const data = await response.json();
        if (response.status === 201) {
            alert(data.message);
        } else {
            alert(data.message);
        }
    };

    // Modify the handleSignIn function to use navigate after successful login
    const handleSignIn = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loginEmail, password: loginPassword }),
        });

        const data = await response.json();
        if (response.status === 200) {
            // Use navigate to redirect to /home after successful login
            navigate('/home');  // Redirect to homepage
        } else {
            alert(data.message);
        }
    };

    return (
        <div className={`login-form-background`}>
        <div className={`container ${isActive ? 'active' : ''}`} id="container">
            <div className="form-container sign-up">
                <form onSubmit={handleSignUp}>
                    <h1>Create Account</h1>
                    <div className="social-icons">
                        <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                        <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={signUpName} 
                        onChange={(e) => setSignUpName(e.target.value)} 
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={signUpEmail} 
                        onChange={(e) => setSignUpEmail(e.target.value)} 
                    />
                    <div className="password-container">
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="Password" 
                            value={signUpPassword} 
                            onChange={(e) => setSignUpPassword(e.target.value)} 
                        />
                        <i 
                            className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} 
                            onClick={togglePasswordVisibility}
                        ></i>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>

            <div className="form-container sign-in">
                <form onSubmit={handleSignIn}>
                    <h1>Sign In</h1>
                    <div className="social-icons">
                        <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                        <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                    </div>
                    <span>or use your email for login</span>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={loginEmail} 
                        onChange={(e) => setLoginEmail(e.target.value)} 
                    />
                    <div className="password-container">
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            placeholder="Password" 
                            value={loginPassword} 
                            onChange={(e) => setLoginPassword(e.target.value)} 
                        />
                        <i 
                            className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} 
                            onClick={togglePasswordVisibility}
                        ></i>
                    </div>
                    <a href="#">Forgot Your Password?</a>
                    <button type="submit">Sign In</button>
                </form>
            </div>

            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your credentials to use all of the site's features</p>
                        <button className="hidden" onClick={toggleSignIn}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>New Comer?</h1>
                        <p>Register ASAP and use all of the site's features</p>
                        <button className="hidden" onClick={toggleSignUp}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default LoginForm;
