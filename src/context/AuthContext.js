import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedState = localStorage.getItem("isLoggedIn");
    return savedState ? JSON.parse(savedState) : false;
  });

  const [userId, setUserId] = useState(() => {
    const savedState = localStorage.getItem("userId");
    return savedState ? parseInt(savedState, 10) : 0; // Convert to integer
  });

  const [propertyId, SetPropertyId] = useState(() => {
    const savedState = localStorage.getItem("propertyId");
    return savedState ? parseInt(savedState, 10) : 0; // Convert to integer
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("userId", JSON.stringify(userId));
  }, [userId]);

  useEffect(() => {
    localStorage.setItem("userId", JSON.stringify(propertyId));
  }, [propertyId]);

  const loginin = (id) => {
    setIsLoggedIn(true);
    setUserId(id);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(0);
  };

  const getUserId = () => {
    return parseInt(userId, 10); 
  };

  const getPropertyId = () => {
    return parseInt(propertyId, 10);

  };

  const setPropertyId = (id) => {
    console.log(id);
    SetPropertyId(id);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginin, logout, getUserId , getPropertyId ,setPropertyId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
