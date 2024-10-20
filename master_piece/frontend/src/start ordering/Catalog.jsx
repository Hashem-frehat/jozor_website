import React, { useEffect, useState, useContext } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import tanween from "../images/tanween.png";
import jouri from "../images/jouri.jpg";
import axios from "axios";
import { LanguageContext } from "../LanguageContext";

export const Catalog = ({ handleAddToCart }) => {
  const [products, setProducts] = useState([]);
  const { language } = useContext(LanguageContext);
  const intl = useIntl();
  console.log(language);
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
          placeholder={intl.formatMessage({ id: "searchPlaceholder" })}
          className="w-full p-2 border rounded mb-4"
        />
        {products.map((product, index) => (
          <div key={index} className="flex items-center mb-4">
            <img
              src={`http://localhost:3000/${product.photo}`}
              alt={product.name}
              className="w-20 h-20 object-cover mr-4"
            />
            <div>
              <h3 className="font-bold">
                {language === "en" ? product.name : product.namear}
              </h3>
              <p className="text-sm text-gray-600">
                {language === "en"
                  ? product.description
                  : product.descriptionar}
              </p>
              <p className="text-sm text-gray-600">
                <FormattedMessage id="currency" /> {product.price}
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 bg-green-500 text-white px-2 py-1 rounded"
              >
                <FormattedMessage id="addToCart" />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Catalog;
