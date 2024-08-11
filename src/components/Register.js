import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser';

export default function Register() {
  const navigate = useNavigate();
  const form = useRef();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');
  const [verify, setVerify] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const usernamePattern = /^(?:[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*)$/;
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#\-]).{4,8}$/;
  const emailPattern = /^([a-zA-Z0-9]([a-zA-Z0-9_\.]+)?[a-zA-Z0-9])@(([a-zA-Z0-9]([a-zA-Z0-9\-]+)?[a-zA-Z0-9])\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)$/;
  const phonePattern = /^\d{10}$/; // Exactly 10 digits
  const pincodePattern = /^\d{6}$/; // Exactly 6 digits
  const wordPattern = /^[a-zA-Z\s]+$/; // Only letters and spaces

  const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    return code;
  };

  const sendVerificationEmail = (code) => {
    form.current.verification_code.value = code;
    form.current.to_email.value = email; 
    form.current.user_name.value = username; 
    form.current.from_name.value = 'Dream Home'; 

    emailjs.sendForm('service_v26g5ji', 'template_sa0jtrx', form.current, 'r0WFbtk28AelP5tlp')
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        setEmailSent(true);
      }, (err) => {
        console.error('Failed to send email:', err.text);
        setError('Failed to send verification email. Please try again.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate fields
    if (!usernamePattern.test(username)) {
      setError('Invalid username format');
      return;
    }
    if (!emailPattern.test(email)) {
      setError('Invalid email format');
      return;
    }
    if (!passwordPattern.test(password)) {
      setError('Invalid password format');
      return;
    }
    if (!phonePattern.test(phoneNo)) {
      setError('Phone number must be exactly 10 digits');
      return;
    }
    if (!pincodePattern.test(pincode)) {
      setError('Pincode must be exactly 6 digits');
      return;
    }
    if (!wordPattern.test(city)) {
      setError('City must contain only letters');
      return;
    }
    if (!wordPattern.test(state)) {
      setError('State must contain only letters');
      return;
    }

    // Clear error on successful validation
    setError('');
    
    const code = generateVerificationCode();
    sendVerificationEmail(code);
    setVerify(true);
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (verifyCode === generatedCode) {
      setVerificationSuccess(true);
      setTimeout(async () => {
        try {
          const newUser = {
            firstName,
            lastName,
            email,
            phoneNo,
            address,
            city,
            state,
            pincode,
            userName: username,
            password
          };

          const response = await axios.post('http://localhost:9999/user/add', newUser);
          if (response.status === 200) {
            console.log('User registered successfully');
            setVerify(false);
            navigate("/login");
          } else {
            setError('Registration failed');
          }
        } catch (error) {
          console.error('Error registering user:', error);
          setError('An error occurred during registration. Please try again.');
        }
      }, 2000); // Delay navigation for 2 seconds
    } else {
      setError('Invalid verification code');
    }
  };

  // Function to clear error when user starts typing
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError(''); // Clear error when user changes input
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <form className="registration-form" ref={form} onSubmit={verify ? handleVerify : handleSubmit}>
              <h2 className="mb-4">Registration</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {!verify && (
                <>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={handleInputChange(setFirstName)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={handleInputChange(setLastName)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="user_name"
                      placeholder="Enter username"
                      value={username}
                      onChange={handleInputChange(setUsername)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="to_email"
                      placeholder="Enter email"
                      value={email}
                      onChange={handleInputChange(setEmail)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNo">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phoneNo"
                      placeholder="Enter phone number"
                      value={phoneNo}
                      onChange={handleInputChange(setPhoneNo)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Enter address"
                      value={address}
                      onChange={handleInputChange(setAddress)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="Enter city"
                      value={city}
                      onChange={handleInputChange(setCity)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      placeholder="Enter state"
                      value={state}
                      onChange={handleInputChange(setState)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pincode">Pincode</label>
                    <input
                      type="text"
                      className="form-control"
                      id="pincode"
                      placeholder="Enter pincode"
                      value={pincode}
                      onChange={handleInputChange(setPincode)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={handleInputChange(setPassword)}
                      required
                    />
                  </div>
                  <input type="hidden" name="verification_code" />
                  <input type="hidden" name="from_name" />
                  <button type="submit" className="btn btn-primary btn-block">Register</button>
                  {emailSent && <div className="alert alert-success mt-3">Verification email sent successfully.</div>}
                </>
              )}
              {verify && (
                <>
                  <div className="form-group">
                    <p>Code is sent to your email</p>
                    <label htmlFor="verifyCode">Verify Code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter verification code"
                      onChange={(e) => setVerifyCode(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Verify</button>
                  {verificationSuccess && <div className="alert alert-success mt-3">Code verified successfully. Redirecting to login...</div>}
                </>
              )}
              <div className="text-center mt-3">
                <Link to={"/login"} className="login-link">Already have an account? Login here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

