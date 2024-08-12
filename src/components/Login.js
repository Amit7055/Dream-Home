import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      
      const user = users.find(user => user.userName === username && user.password === password);

      if (user) {
        loginin(user.userId)
        navigate("/home");
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center align-items-center loginContainer ">
          <div className="col-lg-4 col-md-6">
            <form className="login-form" onSubmit={handleSubmit}>
              <h2 className="text-center">Login</h2>
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
