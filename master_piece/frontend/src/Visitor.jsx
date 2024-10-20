import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
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
import Navbar from "./Navbar";

function Visitor() {
  return (
    <div className="max-w-8xl mx-100%">
      <Navbar />
      <div className="relative bg-sec mb-12 h-96 rounded-xl overflow-hidden">
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
          <h1 className="text-4xl font-bold mb-4">
            <FormattedMessage id="makeYourFarmBeautiful" />
          </h1>
          <Link
            to="/catigory"
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-hoverpri transition"
          >
            <FormattedMessage id="letsGo" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { img: sapling, titleId: "sapling" },
          { img: samad, titleId: "agriculturalMaterials" },
          { img: seeds, titleId: "seeds" },
          { img: tools, titleId: "tools" },
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
            <p className="text-lg font-semibold">
              <FormattedMessage id={category.titleId} />
            </p>
          </Link>
        ))}
      </div>

      <div className="space-y-6 mb-12">
        <div className="bg-gradient-to-l from-[#F1EAE3] to-[#BDBA96] rounded-xl p-6 flex items-center flex-wrap">
          <img
            src={care}
            alt=""
            className="w-80 h-52 rounded-xl object-cover mr-6"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2">
              <FormattedMessage id="transplantCareGuide" />
            </h2>
            <p className="mb-4">
              <FormattedMessage id="trackFarmingProgress" />
            </p>
            <Link
              to="/plantCareGuide"
              className="bg-primary text-white px-4 py-2 rounded-full hover:bg-hoverpri transition"
            >
              <FormattedMessage id="learnMore" />
            </Link>
          </div>
        </div>
        <div className="bg-gradient-to-l from-[#F1EAE3] to-[#BDBA96] rounded-xl p-6 flex items-center flex-wrap">
          <img
            src={care}
            alt=""
            className="w-80 h-52 rounded-xl object-cover mr-6"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2">
              <FormattedMessage id="plantsInformation" />
            </h2>
            <p className="mb-4">
              <FormattedMessage id="learnAboutPlants" />
            </p>
            <Link
              to="/plantsdoc"
              className="bg-primary text-white px-4 py-2 rounded-full hover:bg-hoverpri transition"
            >
              <FormattedMessage id="learnMore" />
            </Link>
          </div>
        </div>
        <div className="bg-gradient-to-l from-[#F1EAE3] to-[#BDBA96] rounded-xl p-6 flex items-center flex-wrap">
          <img
            src={transplanting}
            alt=""
            className="w-80 h-52 rounded-xl object-cover mr-6"
          />
          <div>
            <h2 className="text-2xl font-bold mb-2">
              <FormattedMessage id="requestFarmer" />
            </h2>
            <p className="mb-4">
              <FormattedMessage id="getProfessionalHelp" />
            </p>
            <Link
              to="/requestFarmer"
              className="bg-primary text-white px-4 py-2 rounded-full hover:bg-hoverpri transition"
            >
              <FormattedMessage id="learnMore" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-6">
          <FormattedMessage id="joinUs" />
        </h2>
        <p className="text-xl text-center mb-8">
          <FormattedMessage id="bePartOfJozorStory" />
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-l from-[#F1EAE3] to-[#BDBA96] rounded-xl p-4 flex items-center ">
            <img
              src={part1}
              alt=""
              className="w-40 h-24 rounded-xl object-cover mr-4"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">
                <FormattedMessage id="becomePartner" />
              </h3>
              <p className="mb-4">
                <FormattedMessage id="reachMoreCustomers" />
              </p>
              <Link
                to="/partnersignup"
                className="bg-primary text-white px-4 py-2 rounded-full hover:bg-hoverpri transition"
              >
                <FormattedMessage id="learnMore" />
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-l from-[#F1EAE3] to-[#BDBA96] rounded-xl p-4 flex items-center">
            <img
              src={part2}
              alt=""
              className="w-40 h-24 rounded-xl object-cover mr-4"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">
                <FormattedMessage id="buildCareer" />
              </h3>
              <p className="mb-4">
                <FormattedMessage id="joinDynamicTeam" />
              </p>
              <Link
                to="/careerpage"
                className="bg-primary text-white px-4 py-2 rounded-full hover:bg-hoverpri transition"
              >
                <FormattedMessage id="learnMore" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">
          <FormattedMessage id="comingSoon" />
        </h2>
        <img
          src={googleplay}
          alt="Google Play"
          className="w-96 h-24 rounded-xl mx-auto"
        />
      </div>
    </div>
  );
}

export default Visitor;
