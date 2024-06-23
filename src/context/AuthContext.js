import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

let verify = [
    { id: 'example1@gmail.com', password: 'Eaxm1@99' , username:'Exam1'},
    { id: 'example2@gmail.com', password: 'Eaxm2@99' , username:'Exam2'},
    { id: 'example3@gmail.com', password: 'Eaxm3@99' , username:'Exam3'},
  ];

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const savedState = localStorage.getItem("isLoggedIn");
        return savedState ? JSON.parse(savedState) : false;
      });
      
      const [username, setUsername] = useState(() => {
        const savedUsername = localStorage.getItem("username");
        return savedUsername ? JSON.parse(savedUsername) : "";
      });

      const[userPassword , setUserPassword] = useState(() => {
        const savedUserPassword = localStorage.getItem("userPassword");
        return savedUserPassword? JSON.parse(savedUserPassword) : "";
      })

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("username", JSON.stringify(username));
  }, [username]);

  useEffect(() => {
    localStorage.setItem("userPassword", JSON.stringify(userPassword));
  }, [userPassword]);

  const loginin = (username, password) => {
    setIsLoggedIn(true);
    setUsername(username);
    setUserPassword(password)
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setUserPassword("");
  };

  const verifyUser = (username, password) => {
    return verify.some(user => user.id === username && user.password === password);
  };

  const registration = (gmail, password, username) => {
    verify.push({ id: gmail, password: password, username: username });
    console.log(verify);
    localStorage.setItem("verify", JSON.stringify(verify)); // Update local storage
    return verify.some((user) => user.id === gmail && user.password === password);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, username, userPassword,loginin, logout, verifyUser, registration }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
