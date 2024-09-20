import React from "react";
import tanween from "./images/tanween.png";
import jouri from "./images/jouri.jpg";
import { Link } from "react-router-dom";
const Mainorder = () => {
  return (
    <div className="container mx-auto p-4">
      <Header />
      <Navigation />
      <div className="flex mt-4">
        <MenuSection />
        <CartSection />
      </div>
    </div>
  );
};

const Header = () => (
  <header className="flex items-center mb-4">
    <img src={tanween} alt="Tanween" className="w-12 h-12 mr-2" />
    <div>
      <h1 className="text-xl font-bold">Tanween</h1>
      <p className="text-sm text-gray-600">In Ajloun, Jordan</p>
      <p className="text-sm text-gray-600">
        Category: Agricultural materials, Seeds
      </p>
    </div>
  </header>
);

const Navigation = () => (
  <nav className="flex border-b">
    <button className="px-4 py-2 text-green-500 border-b-2 border-green-500">
      Menu
    </button>
    <button className="px-4 py-2">Review</button>
    <button className="px-4 py-2">Info</button>
  </nav>
);

const MenuSection = () => (
  <section className="w-2/3 pr-4">
    <input
      type="text"
      placeholder="Search menu item"
      className="w-full p-2 border rounded mb-4"
    />
    {[1, 2, 3, 4, 5, 6].map((item) => (
      <MenuItem key={item} />
    ))}
  </section>
);

const MenuItem = () => (
  <div className="flex items-center mb-4">
    <img src={jouri} alt="Juri roses" className="w-20 h-20 object-cover mr-4" />
    <div>
      <h3 className="font-bold">Juri roses</h3>
      <p className="text-sm text-gray-600">
        Beautiful pink roses perfect for your garden
      </p>
      <p className="text-sm text-gray-600">JOD 5.00</p>
    </div>
  </div>
);

const CartSection = () => (
  <section className="w-1/3 bg-gray-100 p-4 rounded">
    <h2 className="font-bold mb-4">Your Cart</h2>
    <CartItem />
    <CartItem />
    <div className="border-t mt-4 pt-4">
      <p className="flex justify-between">
        <span>Subtotal</span>
        <span>JOD 9.00</span>
      </p>
      <p className="flex justify-between">
        <span>Delivery fee</span>
        <span>JOD 0.50</span>
      </p>
      <p className="flex justify-between">
        <span>Service fee</span>
        <span>JOD 0.50</span>
      </p>
      <p className="flex justify-between font-bold">
        <span>Total amount</span>
        <span>JOD 10.00</span>
      </p>
    </div>
    <Link
      to="/orderSummary"
      className="w-full bg-bottonpri hover:bg-primary-dark text-white py-2 rounded mt-4 text-center flex items-center justify-center"
      style={{ textDecoration: "none", display: "block" }}
    >
      PROCEED TO CHECKOUT
    </Link>
  </section>
);

const CartItem = () => (
  <div className="flex justify-between items-center mb-2">
    <div>
      <h4 className="font-bold">Tanween</h4>
      <p className="text-sm">Juri roses</p>
    </div>
    <div className="flex items-center">
      <button className="px-2 bg-gray-200 rounded">-</button>
      <span className="mx-2">1</span>
      <button className="px-2 bg-gray-200 rounded">+</button>
      <span className="ml-4">JOD 5.00</span>
    </div>
  </div>
);

export default Mainorder;
