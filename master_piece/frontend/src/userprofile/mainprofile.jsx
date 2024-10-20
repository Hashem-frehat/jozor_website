import React, { useState } from "react";
import { Home, Settings, User, Mail } from "lucide-react";
import { DeliveryAddress } from "./Deleveryaddres";
import { Myaccount } from "./Myaccount";
import { Myorders } from "./Myorders";
import Navbar from "../Navbar";
// Placeholder components for demonstration

export const Layout = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "Myaccount", name: "Myaccount", icon: User, component: Myaccount },
    {
      id: "DeliveryAddress",
      name: "DeliveryAddress",
      icon: Home,
      component: DeliveryAddress,
    },
    { id: "Myorders", name: "Myorders", icon: Mail, component: Myorders },
  ];

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || Myaccount;

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <Navbar />
      <div className="container max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold p-6 border-b">My Account</h1>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-50 p-6 border-r">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`block py-2 text-primary hover:text-primary-dark transition-colors w-full text-left ${
                  activeTab === tab.id ? "font-bold text-primary-dark " : ""
                }`}
              >
                <tab.icon className="mr-2 inline" size={20} />
                {tab.name}
              </button>
            ))}
          </div>

          {/* Main content area */}
          <div className="flex-1 bg-white p-6">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
};
