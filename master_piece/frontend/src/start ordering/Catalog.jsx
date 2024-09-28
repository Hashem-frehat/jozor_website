import React, { useEffect, useState } from "react";
import tanween from "../images/tanween.png";
import jouri from "../images/jouri.jpg";
import axios from "axios";

export const Catalog = ({ handleAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const partner_id = sessionStorage.getItem("partner_id");
        const response = await axios.get(
          `http://localhost:3000/api/products/partner/${partner_id}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <section className="w-2/3 pr-4">
        <input
          type="text"
          placeholder="Search menu item"
          className="w-full p-2 border rounded mb-4"
        />
        {products.map((product, index) => (
          <div key={index} className="flex items-center mb-4">
            <img
              src={jouri}
              alt="Juri roses"
              className="w-20 h-20 object-cover mr-4"
            />
            <div>
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm text-gray-600">JOD {product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 bg-green-500 text-white px-2 py-1 rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
