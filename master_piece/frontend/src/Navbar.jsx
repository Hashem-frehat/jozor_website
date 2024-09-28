import React, { useState } from "react";
import aaa from "./images/a.png";
import { Link } from "react-router-dom";
import logo from "./images/jzoorlogo.png";
function Navbar() {
  const [isactive, setisactive] = useState("false");
  function Toggle() {
    setisactive(!isactive);
  }
  return (
    <div className="containerr">
      <div className="navbar">
        <img src={aaa} alt="logo" className="w-72 h-20" />
        <button
          className={isactive ? "active" : "null"}
          onClick={Toggle}
          id="burger-menu"
        >
          &#9776;
        </button>
        <div className="nav-item" id="nav-item">
          <Link to="/">home</Link>
          <Link to="/contactus">Contactus</Link>
          <Link to="/myaccount">myaccount</Link>
          <div></div>
          <Link className="b  py-2 px-4" to="/login">
            login
          </Link>
        </div>
        <div className="hidd"></div>
      </div>
    </div>
  );
}

export default Navbar;
