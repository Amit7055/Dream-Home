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
import AboutUs from "./components/AboutUs";
import Property from "./components/Property";
import Servies from "./components/Servies";
import Contact from "./components/Contact";
import LandlordTenantSection from "./components/LandlordTenantSection";
import Tenant from "./components/Tenant";
import ViewAppointments from "./components/ViewAppointments";
import AdminLogin from "./components/AdminLogin";
import AdminLanding from "./components/AdminLanding";
import AdminProperty from "./components/AdminProperty";
import AdminUserDetail from "./components/AdminUserDetail";
import ForgotPassword from "./components/ForgotPassword";
import AdminAppointment from "./components/AdminAppointment";
import RentForm from "./components/RentForm";



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
          <Route path="rentForm" element={<RentForm/>}/>
          <Route path="aboutus" element={<AboutUs />}/>
          <Route path="property" element={<Property />}/> 
          <Route path="service" element={<Servies />}/> 
          <Route path="contact" element={<Contact />}/>
          <Route path="landlordtenant" element={<LandlordTenantSection />}/>
          <Route path="tenant" element={<Tenant />}/>
          <Route path="viewappointments" element={<ViewAppointments />}/>
          <Route path="adminlogin" element={<AdminLogin />}/>
          <Route path="admin" element={<AdminLanding />}/>
          <Route path="adminproperty" element={<AdminProperty />}/>
          <Route path="adminuser" element={<AdminUserDetail />}/>
          <Route path="adminproperty" element={<AdminProperty />}/>
          <Route path="adminappointment" element={<AdminAppointment />}/>
          <Route path="forgotpassword" element={<ForgotPassword />}/>
        </Route>
      </Routes>
   </AuthProvider>
  </BrowserRouter>
);