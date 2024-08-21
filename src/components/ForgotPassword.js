import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const form = useRef();
  const [email, setEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [userData, setUserData] = useState(null);

  const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#\-]).{4,8}$/;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError(''); // Clear error when user changes input
  };

  const handleVerifyCodeChange = (e) => {
    setVerifyCode(e.target.value);
    if (error) setError(''); // Clear error when user changes input
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (error) setError(''); // Clear error when user changes input
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (error) setError(''); // Clear error when user changes input
  };

  const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    return code;
  };

  const sendVerificationEmail = (code) => {
    if (form.current) {
      form.current.verification_code.value = code;
      form.current.to_email.value = email; 
      form.current.from_name.value = 'Dream Home'; 

      emailjs.sendForm('service_v26g5ji', 'template_sa0jtrx', form.current, 'r0WFbtk28AelP5tlp')
        .then((response) => {
          console.log('Email sent successfully:', response.status, response.text);
          setEmailSent(true);
        }, (err) => {
          console.error('Failed to send email:', err.text);
          setError('Failed to send verification email. Please try again.');
        });
    } else {
      console.error('Form reference is undefined');
    }
  };

  const handleRequestPasswordReset = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.get('http://localhost:9999/user/all');
      const users = response.data.find(user => user.email === email);
      console.log(users);

      if (users) {
        const code = generateVerificationCode();
        sendVerificationEmail(code);
        setUserData(users);
      } else {
        setError('Email not found.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('An error occurred while checking email.');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (verifyCode === generatedCode) {
      setVerificationSuccess(true);
    } else {
      setError('Invalid verification code');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!passwordPattern.test(newPassword)) {
      setError('Invalid password format. Password must be 4 to 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character (@, #, -).');
      return;
    }

    try {
      const updatedUser = { ...userData, password: newPassword };

      const response = await axios.put(`http://localhost:9999/user/update/${userData.userId}`, updatedUser);
      if (response.status === 200) {
        console.log('Password updated successfully');
        navigate("/login");
      } else {
        setError('Failed to update password.');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setError('An error occurred while updating the password.');
    }
  };

  return (
    <div>
      <div className="container custom-container mt-5">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <form className="forgot-password-form" ref={form} onSubmit={verificationSuccess ? handleUpdatePassword : (emailSent ? handleVerify : handleRequestPasswordReset)}>
              <h2 className="mb-4">Forgot Password</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {!verificationSuccess && (
                <>
                  <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="to_email"
                      placeholder="Enter email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Request Password Reset</button>
                  {emailSent && <div className="alert alert-success mt-3">Verification email sent successfully.</div>}
                </>
              )}
              {emailSent && !verificationSuccess && (
                <>
                  <div className="form-group">
                    <label htmlFor="verifyCode">Verify Code</label>
                    <input
                      type="text"
                      className="form-control"
                      id="verifyCode"
                      placeholder="Enter verification code"
                      onChange={handleVerifyCodeChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Verify</button>
                </>
              )}
              {verificationSuccess && (
                <>
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPassword"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Update Password</button>
                </>
              )}
              <div className="text-center mt-3">
                <Link to={"/login"} className="login-link">Back to Login</Link>
              </div>
              <input type="hidden" name="verification_code" />
              <input type="hidden" name="from_name" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
