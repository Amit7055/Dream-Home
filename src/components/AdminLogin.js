import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import bcrypt from 'bcryptjs'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogin() {
    const { adminLoginin } = useContext(AuthContext);
    const navigate = useNavigate(); 
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const response = await axios.get('http://localhost:9999/admin/all');
        const users = response.data;
        const user = users.find(user => user.userName === username);
        
        if (user && bcrypt.compareSync(password, user.password)) {

          toast.success('Login Successful!', {
            className: 'custom-toast-success',
          });

          setTimeout(() => {
            adminLoginin(user.adminId);
          navigate("/admin");
          }, 1500); 
        } else {
          // alert('Invalid username or password');
          toast.warning("Login Failed", {
            className: 'custom-toast-warning',
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        alert('An error occurred while trying to log in. Please try again later.');
      }
    };
  
    return (
      <div>
        <div className="container">
        <ToastContainer position="bottom-center" />
          <div className="row justify-content-center align-items-center loginContainer ">
            <div className="col-lg-4 col-md-6">
              <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="text-center">Login - Admin</h2>
                <div className="form-group">
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
                  <a href="#" className="forgot-password">
                    Forgot Password?
                  </a>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
