import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center">
          {/* Left side - Text and Form */}
          <div className="w-full lg:w-1/2 pr-4">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Grow your business online with talabat!
            </h1>
            <p className="text-gray-600 mb-6">
              Partner with us to reach more customers, earn more money and grow
              your business online - your success story begins here
            </p>

            {/* Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4">
                Ready to grow your business?
              </h2>
              <form>
                <input
                  className="w-full mb-4 p-2 border rounded"
                  type="text"
                  placeholder="First Name"
                />
                <input
                  className="w-full mb-4 p-2 border rounded"
                  type="text"
                  placeholder="Last Name"
                />
                <input
                  className="w-full mb-4 p-2 border rounded"
                  type="email"
                  placeholder="Business Email"
                />

                <select className="w-full mb-4 p-2 border rounded">
                  <option>bbbb</option>
                  <option>bbbb</option>
                </select>
                <div className="flex mb-4">
                  <select className="w-1/4 p-2 border rounded-l">
                    <option>+962</option>
                  </select>
                  <input
                    className="w-3/4 p-2 border rounded-r"
                    type="tel"
                    placeholder="Mobile Phone Number"
                  />
                </div>
                <button className="w-full bg-bottonpri text-white p-3 rounded font-semibold">
                  Get Started
                </button>
              </form>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <img
              src="/path-to-your-image.jpg"
              alt="Business owner"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Why partner with us section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why you should{" "}
            <span className="text-secondary">partner with us</span>
          </h2>
          <div className="flex flex-wrap justify-center">
            {/* Reach more customers */}
            <div className="w-full md:w-1/3 p-4 text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img
                  src="/path-to-icon1.png"
                  alt="Reach more customers"
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  Reach more customers
                </h3>
                <p className="text-gray-600">
                  We have thousands of hungry customers in your area waiting to
                  order from you and we'll help you deliver their food faster.
                </p>
              </div>
            </div>
            {/* Earn more money */}
            <div className="w-full md:w-1/3 p-4 text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img
                  src="/path-to-icon2.png"
                  alt="Earn more money"
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Earn more money</h3>
                <p className="text-gray-600">
                  We'll help you serve more hungry customers without adding more
                  chairs to your restaurant and we'll make sure you get paid
                  promptly.
                </p>
              </div>
            </div>
            {/* Grow your business */}
            <div className="w-full md:w-1/3 p-4 text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img
                  src="/path-to-icon3.png"
                  alt="Grow your business"
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  Grow your business
                </h3>
                <p className="text-gray-600">
                  Increase sales, reach more customers or market your business
                  better. We deliver ways to grow your business because when you
                  succeed, we do too.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
