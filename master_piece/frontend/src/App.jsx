import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Myaccount from "./userprofile/Myaccount";
import Deleveryaddres from "./userprofile/Deleveryaddres";
import Myorders from "./userprofile/Myorders";
import Catigory from "./start ordering/Catigory";
import "./App.css";
import Visitor from "./Visitor";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Contactus from "./Contactus";
import Mainorder from "./start ordering/mainorder";
import OrderSummary from "./start ordering/ordersummary";
import Partnersignup from "./partnercomponent/partnersignup";
import Customers from "./dashbourd-component/customers";

import Plantsdoc from "./plantsdoc";
import RequestFarmer from "./requestfarmer";
import PlantCareGuide from "./careguide";
import Partnerlogin from "./partnercomponent/partnerlogin";
import PartnerDashboard from "./partnercomponent/partnerdashbourd";
import Careerpage from "./carrerpage";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import AdminDashboard from "./admindashbourd/dashbourdadmin";

function App() {
  const initialOptions = {
    "client-id":
      "AWrR0dEDBlc9AVYB7E-RbYM8HyZMGiRs_ibLN1lcJXBnv8DhZc1BuvhagRX5ycmsDSNQ3B5TxKya81_v", // Replace with your actual client ID
    components: "buttons", // Ensure to include buttons here
  };
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Visitor />} />
        <Route path="signup" element={<Signup />} />
        <Route path="myaccount" element={<Myaccount />} />
        <Route path="deleveryaddres" element={<Deleveryaddres />} />
        <Route path="/mainorder/*" element={<Mainorder />} />
        <Route path="myorders" element={<Myorders />} />
        <Route path="contactus" element={<Contactus />} />
        <Route path="catigory" element={<Catigory />} />
        <Route path="customers" element={<Customers />} />
        <Route path="plantCareGuide" element={<PlantCareGuide />} />
        <Route path="partnersignup" element={<Partnersignup />} />
        <Route path="partnerlogin" element={<Partnerlogin />} />
        <Route path="/partnerProfile/*" element={<PartnerDashboard />} />
        <Route
          path="orderSummary"
          element={
            <PayPalScriptProvider options={initialOptions}>
              <OrderSummary />
            </PayPalScriptProvider>
          }
        />
        <Route path="plantsdoc" element={<Plantsdoc />} />
        <Route path="requestFarmer" element={<RequestFarmer />} />
        <Route path="careerpage" element={<Careerpage />} />
        <Route path="adminDashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
