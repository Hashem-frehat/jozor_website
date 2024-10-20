import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { LanguageContext } from "./LanguageContext";
import aaa from "./images/a.png";

function Navbar() {
  const [isactive, setisactive] = useState(false);
  const { language, toggleLanguage } = useContext(LanguageContext);

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
          <Link to="/">
            <FormattedMessage id="home" />
          </Link>
          <Link to="/contactus">
            <FormattedMessage id="contactUs" />
          </Link>
          <Link to="/myaccount">
            <FormattedMessage id="myAccount" />
          </Link>
          <button onClick={toggleLanguage} className="language-toggle">
            {language === "ar" ? "English" : "العربية"}
          </button>
          <Link className="b py-2 px-4" to="/login">
            <FormattedMessage id="login" />
          </Link>
        </div>
        <div className="hidd"></div>
      </div>
    </div>
  );
}

export default Navbar;
