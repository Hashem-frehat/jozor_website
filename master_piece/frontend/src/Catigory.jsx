import React, { useEffect, useState } from "react";
import tanween from "./images/tanween.png";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Category() {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();
  // الفئات المتاحة
  const categories = ["Sapling", "Agricultural", "Seeds", "Tools"];

  // جلب البيانات من API
  useEffect(() => {
    const fetchpartner = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/partners`);
        setPartners(response.data);
        setFilteredPartners(response.data);
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
  // وظيفة البحث والفلترة
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

  // التعامل مع تغيير البحث
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // التعامل مع تغيير الفئات
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold p-6 border-b">Categories</h1>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-50 p-6 border-r">
            <h2 className="text-xl font-semibold mb-4">Filter by</h2>
            <input
              type="search"
              placeholder="Search..."
              className="w-full p-2 border rounded mb-4"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <h3 className="font-semibold mb-2">Categories</h3>
            {categories.map((category, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <label htmlFor={`category-${index}`}>{category}</label>
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
                  alt="partner logo"
                  className="w-32 h-32 object-cover rounded-lg mr-6"
                />
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    {item.storeName}
                  </h2>
                  <p className="text-gray-600">{item.catigory}</p>
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
