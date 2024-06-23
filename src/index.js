import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthProvider from "./context/AuthContext";
import Home1 from "./components/Home1";
import Profile from "./components/Profile";
import Landlord from "./components/Landlord";
import Seller from "./components/Seller";
import Rent from "./components/Rent";
import Buy from "./components/Buy";
import Details from "./components/Details";
import Appointment from "./components/Appointment";
import BuyerForm from "./components/BuyerForm";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <AuthProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
          <Route path="home" element={<Home1/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="landlord" element={<Landlord />}/>
          <Route path="seller" element={<Seller />}/>
          <Route path="rent" element={<Rent />}/>
          <Route path="buy" element={<Buy />}/>
          <Route path="detail" element={<Details />}/>
          <Route path="appointment" element={<Appointment />}/>
          <Route path="buyerForm" element={<BuyerForm />}/>
        </Route>
      </Routes>
   </AuthProvider>
  </BrowserRouter>
);