import React, { useEffect, useState, useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import tanween from "../images/tanween.png";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { LanguageContext } from "../LanguageContext";

function Category() {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const intl = useIntl();

  // Available categories
  const categories = ["Sapling", "Agricultural", "Seeds", "Tools"];

  // Fetch data from API
  useEffect(() => {
    const fetchpartner = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/partners`);
        const data = response.data.filter((datee) => datee.isactive === true);
        setPartners(data);
        setFilteredPartners(data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchpartner();
  }, []);

  const handleSubmit = (id) => {
    sessionStorage.setItem("partner_id", id);
    navigate("/mainorder");
  };

  // Search and filter function
  useEffect(() => {
    const results = partners.filter((partner) => {
      const matchesSearch = partner.storeName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(partner.catigory);
      return matchesSearch && matchesCategory;
    });
    setFilteredPartners(results);
  }, [searchTerm, selectedCategories, partners]);

  // Handle search change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <Navbar />
      <div className="container max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold p-6 border-b">
          <FormattedMessage id="categories" defaultMessage="Categories" />
        </h1>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-50 p-6 border-r">
            <h2 className="text-xl font-semibold mb-4">
              <FormattedMessage id="filterBy" defaultMessage="Filter by" />
            </h2>
            <input
              type="search"
              placeholder={intl.formatMessage({
                id: "searchPlaceholder",
                defaultMessage: "Search...",
              })}
              className="w-full p-2 border rounded mb-4"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <h3 className="font-semibold mb-2">
              <FormattedMessage id="categories" defaultMessage="Categories" />
            </h3>
            {categories.map((category, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <label htmlFor={`category-${index}`}>
                  <FormattedMessage
                    id={`category.${category.toLowerCase()}`}
                    defaultMessage={category}
                  />
                </label>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="w-3/4 p-6">
            {filteredPartners.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSubmit(item._id)}
                className="flex items-center mb-6 pb-6 border-b last:border-b-0 cursor-pointer "
              >
                <img
                  src={tanween}
                  alt={intl.formatMessage({
                    id: "partnerLogoAlt",
                    defaultMessage: "partner logo",
                  })}
                  className="w-32 h-32 object-cover rounded-lg mr-6"
                />
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    {language == "en" ? item.storeName : item.storeNamearabic}
                  </h2>
                  <p className="text-gray-600">
                    {language === "en"
                      ? item.catigory.join(" ")
                      : item.catigoryar.join(" ")}
                  </p>
                </div>
              </div>
            ))}
            <div className="mt-8 flex justify-center">
              <Pagination count={10} color="primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
