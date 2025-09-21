import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log('Login successful:', userCredential.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.message);
      alert('Login failed: ' + error.message);
    }

    console.log('Form submitted:', formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    
    <div className="Login">
      <h1 className="Login-title">GuardEye</h1>
      <div className="container">
        <h2 className="FormTopic">Login</h2>
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              onKeyPress={handleKeyPress}
            />
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                onKeyPress={handleKeyPress}
                style={{ width: '100%', paddingRight: '30px' }} 
              />
              <span
                onClick={togglePasswordVisibility}
                style={{
                  color: 'black'  ,
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit">Login</button>
          </form>
          <p style={{ marginTop: '10px' }}>
            <Link to="/reset-password">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
   
  );
}

export default Login;