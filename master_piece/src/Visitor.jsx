import React from "react";
import { Link } from "react-router-dom";
import flower1 from "./images/flower1.png";
import flower2 from "./images/flower2.png";
import samad from "./images/samad.png";
import seeds from "./images/seeds.webp";
import tools from "./images/tools.webp";
import sapling from "./images/Sapling.png";
import care from "./images/care.png";
import transplanting from "./images/transplanting.jpg";
import googleplay from "./images/googleplay.png";
import part1 from "./images/part1.png";
import part2 from "./images/part2.png";

function Visitor() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative bg-sec mb-12 rounded-xl overflow-hidden">
        <img
          src={flower1}
          alt=""
          className="absolute left-0 h-full object-cover"
        />
        <img
          src={flower2}
          alt=""
          className="absolute right-0 h-full object-cover"
        />
        <div className="relative z-10 text-center py-24">
          <h1 className="text-4xl font-bold mb-4">Make Your Farm Beautiful</h1>
          <Link
            to="/catigory"
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
          >
            Let's Go
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { img: sapling, title: "Sapling" },
          { img: samad, title: "Agricultural Materials" },
          { img: seeds, title: "Seeds" },
          { img: tools, title: "Tools" },
        ].map((category, index) => (
          <Link
            to="/catigory"
            key={index}
            className="bg-gradient-to-l from-[#F1EAE3] to-[#BDBA96] rounded-xl p-4 flex flex-col items-center justify-center transition-transform hover:scale-105"
          >
            <img
              src={category.img}
              alt=""
              className="w-40 h-40 object-contain mb-4"
            />
            <p className="text-lg font-semibold">{category.title}</p>
          </Link>
        ))}
      </div>

      {/* Guides */}
      <div className="space-y-6 mb-12">
        {[
          {
            img: care,
            title: "Transplant Care Guide",
            desc: "Track your farming progress effortlessly",
          },
          {
            img: transplanting,
            title: "Request a Farmer",
            desc: "Get professional help to care for your plants",
          },
        ].map((guide, index) => (
          <div
            key={index}
            className="bg-gradient-to-l from-[#F1EAE3] to-[#BDBA96] rounded-xl p-6 flex items-center"
          >
            <img
              src={guide.img}
              alt=""
              className="w-80 h-52 rounded-xl object-cover mr-6"
            />
            <div>
              <h2 className="text-2xl font-bold mb-2">{guide.title}</h2>
              <p className="mb-4">{guide.desc}</p>
              <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
        <img
          src={googleplay}
          alt="Google Play"
          className="w-96 h-24 rounded-xl mx-auto"
        />
      </div>

      {/* Join Us */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-6">Join Us</h2>
        <p className="text-xl text-center mb-8">Be a part of the Jozor story</p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              img: part1,
              title: "Become a Partner",
              desc: "Reach more customers and achieve growth with us",
            },
            {
              img: part2,
              title: "Build Your Career",
              desc: "Join the dynamic team that makes it all happen",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-l from-[#F1EAE3] to-[#BDBA96] rounded-xl p-4 flex items-center"
            >
              <img
                src={item.img}
                alt=""
                className="w-40 h-24 rounded-xl object-cover mr-4"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="mb-4">{item.desc}</p>
                <button className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Visitor;
