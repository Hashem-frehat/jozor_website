import React from "react";
import tanween from "./images/tanween.png";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
function Category() {
  const categories = ["Sapling", "Agricultural", "Seeds", "Tools"];
  const items = Array(9).fill({
    name: "Tanween",
    categories: "Sapling, Agricultural materials, Seeds",
  });

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
            />
            <h3 className="font-semibold mb-2">Categories</h3>
            {categories.map((category, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`category-${index}`}
                  className="mr-2"
                />
                <label htmlFor={`category-${index}`}>{category}</label>
              </div>
            ))}
            <button className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition duration-300">
              Apply Filters
            </button>
          </div>

          {/* Main content */}
          <div className="w-3/4 p-6">
            {items.map((item, index) => (
              <Link
                to="/mainorder"
                key={index}
                className="flex items-center mb-6 pb-6 border-b last:border-b-0"
              >
                <img
                  src={tanween}
                  alt=""
                  className="w-32 h-32 object-cover rounded-lg mr-6"
                />
                <div>
                  <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                  <p className="text-gray-600">{item.categories}</p>
                </div>
              </Link>
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
