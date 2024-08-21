import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const { loginin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:9999/user/all');
      const users = response.data;
      
      const user = users.find(user => user.userName === username);
      
      console.log(user);
      

      if (user && bcrypt.compareSync(password, user.password)) {
        toast.success('Login Successful!', {
          className: 'custom-toast-success',
        });
        loginin(user.userId);
        setTimeout(() => {
          loginin(user.userId);
          navigate("/home");
        }, 1500);
      } else {
        alert('Invalid username or password');
        toast.warning("Login Failed", {
          className: 'custom-toast-warning',
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.warning("An error occurred. Please try again later.", {
        className: 'custom-toast-warning',
      });
    }
  };

  return (
    <div>
      <div className="container ">
        <div className="row justify-content-center align-items-center loginContainer ">
          <div className="col-lg-4 col-md-6">
            <form className="login-form" onSubmit={handleSubmit}>
              <h2 className="text-center">Login</h2>
              <div className="form-group">
              <ToastContainer position="bottom-center" />
                <label htmlFor="username">Username</label>  
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <Link to="/forgotpassword" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
              <div className="form-group text-center">
                <p>
                  Don't have an account?{' '}
                  <Link to={"/register"} className="register-link">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
