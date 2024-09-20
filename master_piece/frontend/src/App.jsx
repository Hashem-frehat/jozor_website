import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Myaccount from "./Myaccount";
import Deleveryaddres from "./Deleveryaddres";
import Myorders from "./Myorders";
import Catigory from "./Catigory";
import "./App.css";
import Visitor from "./Visitor";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Contactus from "./Contactus";
import Mainorder from "./mainorder";
import OrderSummary from "./ordersummary";
import Partnersignup from "./partnersignup";
import Customers from "./dashbourd-component/customers";
import PartnerProfile from "./partnerprofile";
import Plantsdoc from "./plantsdoc";
import RequestFarmer from "./requestfarmer";
import PlantCareGuide from "./careguide";
import Partnerlogin from "./partnerlogin";
import Careerpage from "./carrerpage";
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* <PartnerProfile /> */}
      {/* <LandingPage /> */}
      {/* <Careerpage /> */}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Visitor />} />
        <Route path="signup" element={<Signup />} />
        <Route path="myaccount" element={<Myaccount />} />
        <Route path="deleveryaddres" element={<Deleveryaddres />} />
        <Route path="mainorder" element={<Mainorder />} />
        <Route path="myorders" element={<Myorders />} />
        <Route path="contactus" element={<Contactus />} />
        <Route path="catigory" element={<Catigory />} />
        <Route path="customers" element={<Customers />} />
        <Route path="plantCareGuide" element={<PlantCareGuide />} />
        <Route path="partnersignup" element={<Partnersignup />} />
        <Route path="partnerlogin" element={<Partnerlogin />} />
        <Route path="partnerProfile" element={<PartnerProfile />} />
        <Route path="orderSummary" element={<OrderSummary />} />
        <Route path="plantsdoc" element={<Plantsdoc />} />
        <Route path="requestFarmer" element={<RequestFarmer />} />
        <Route path="careerpage" element={<Careerpage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
