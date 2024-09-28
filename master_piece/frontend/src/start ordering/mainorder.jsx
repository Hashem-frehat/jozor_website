import React, { useEffect, useState } from "react";
import tanween from "../images/tanween.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { Review } from "./Review"; // تأكد من صحة التصدير/الاستيراد
import { Catalog } from "./Catalog"; // تأكد من صحة التصدير/الاستيراد
import { Star } from "lucide-react";

const Mainorder = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [stars, setStars] = useState([]);
  const [partner, setPartner] = useState(null);

  const tabs = [
    { id: "catalog", name: "Catalog", component: Catalog },
    { id: "review", name: "Review", component: Review },
  ];

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || Catalog;

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        // إذا كان المنتج موجودًا، زِد العدد بمقدار 1
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // إذا لم يكن موجودًا، أضف المنتج مع كمية 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleIncrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems(
      (prev) =>
        prev
          .map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // إزالة المنتج إذا كانت الكمية 0
    );
  };

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
  useEffect(() => {
    const fetchPartner = async () => {
      const partner_id = sessionStorage.getItem("partner_id");
      if (!partner_id) return; // Only fetch if partnerId is available

      try {
        const response = await axios.get(
          `http://localhost:3000/api/partners/${partner_id}`
        );
        setPartner(response.data);
      } catch (error) {
        console.error("Failed to fetch partner", error);
      }
    };

    fetchPartner();
  }, []);
  useEffect(() => {
    const fetchstars = async () => {
      const partner_id = sessionStorage.getItem("partner_id");
      try {
        const response = await axios.get(
          `http://localhost:3000/api/feedback/stars/${partner_id}`
        );
        setStars(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchstars();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <header className="flex items-center mb-4">
        <img src={tanween} alt="Tanween" className="w-12 h-12 mr-2" />
        <div>
          <h1 className="text-xl font-bold">Tanween</h1>
          <p className="text-sm text-gray-600">In Ajloun, Jordan</p>
          <p className="text-sm text-gray-600">
            Category: Agricultural materials, Seeds
          </p>
        </div>
        <div className="flex items-center justify-end mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={40}
              className={`${
                star <= stars.averageRating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </header>

      <nav className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 ${
              activeTab === tab.id
                ? "text-green-500 border-b-2 border-green-500"
                : "hover:bg-green-500"
            }`}
          >
            <span>{tab.name}</span>
          </button>
        ))}
      </nav>

      <div className="flex mt-4">
        <section className="w-2/3 pr-4">
          <ActiveComponent handleAddToCart={handleAddToCart} />
        </section>

        <section className="w-1/3 bg-gray-100 p-4 rounded">
          <h2 className="font-bold mb-4">Your Cart</h2>
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <div>
                <h4 className="font-bold">{item.name}</h4>
                <p className="text-sm">{item.description}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleDecrement(item.id)}
                  className="px-2 bg-gray-200 rounded"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => handleIncrement(item.id)}
                  className="px-2 bg-gray-200 rounded"
                >
                  +
                </button>
                <span className="ml-4">
                  JOD {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
          <div className="border-t mt-4 pt-4">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>
                JOD{" "}
                {cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Delivery Fee</span>
              <span>JOD {partner ? partner.deliveryFee : "Loading..."}</span>
            </p>
            <p className="flex justify-between">
              <span>Service fee</span>
              <span>JOD {partner ? partner.serviesFee : "Loading..."}</span>
            </p>
            <p className="flex justify-between font-bold">
              <span>Total amount</span>
              <span>
                JOD{" "}
                {(
                  cartItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  ) + 1
                ).toFixed(2)}
              </span>
            </p>
          </div>
          <Link
            to="/orderSummary"
            state={{
              cartItems,
              totalAmount: (
                cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                ) + 1
              ).toFixed(2),
            }}
            className="w-full bg-bottonpri hover:bg-primary-dark text-white py-2 rounded mt-4 text-center flex items-center justify-center"
            style={{ textDecoration: "none", display: "block" }}
          >
            PROCEED TO CHECKOUT
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Mainorder;
