import React from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  PencilSquareIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import { FaGoogle, FaFacebook, FaEnvelope } from "react-icons/fa";
import Navbar from "./Navbar";
function ContactUs() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#F1EAE3] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-[#519335]">
              Contact Us
            </h2>
            <p className="mt-2 text-center text-sm text-[#7ed958]">
              We are here to answer your inquiries and help you take care of
              your plants.
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <FaGoogle className="h-5 w-5 text-red-500 mr-2" />
              Sign in with Google
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <FaFacebook className="h-5 w-5 text-blue-500 mr-2" />
              Sign in with Facebook
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <FaEnvelope className="h-5 w-5 text-gray-500 mr-2" />
              Sign in with Email
            </button>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="relative">
                <UserIcon className="h-5 w-5 text-[#7ed958] absolute top-3 left-3" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#98E379] placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#86E85D] focus:border-[#86E85D] focus:z-10 sm:text-sm pl-10"
                  placeholder="Full Name"
                />
              </div>
              <div className="relative">
                <EnvelopeIcon className="h-5 w-5 text-[#7ed958] absolute top-3 left-3" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#98E379] placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#86E85D] focus:border-[#86E85D] focus:z-10 sm:text-sm pl-10"
                  placeholder="Email"
                />
              </div>
              <div className="relative">
                <PhoneIcon className="h-5 w-5 text-[#7ed958] absolute top-3 left-3" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#98E379] placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#86E85D] focus:border-[#86E85D] focus:z-10 sm:text-sm pl-10"
                  placeholder="Phone Number"
                />
              </div>
              <div className="relative">
                <PencilSquareIcon className="h-5 w-5 text-[#7ed958] absolute top-3 left-3" />
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#98E379] placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#86E85D] focus:border-[#86E85D] focus:z-10 sm:text-sm pl-10"
                  placeholder="Subject"
                />
              </div>
              <div className="relative">
                <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 text-[#7ed958] absolute top-3 left-3" />
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#98E379] placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#86E85D] focus:border-[#86E85D] focus:z-10 sm:text-sm pl-10"
                  placeholder="Your Message"
                ></textarea>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#98E379] hover:bg-[#86E85D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7ed958]"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
