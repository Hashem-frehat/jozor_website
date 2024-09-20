import React, { useState } from "react";
import {
  UserCircleIcon as UserIcon,
  PhoneIcon,
  EnvelopeIcon as MailIcon,
  MapPinIcon as LocationMarkerIcon,
  CalendarDaysIcon as CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

function RequestFarmer() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    date: "",
    time: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-[#F1EAE3]">
      <header className="bg-sec py-6">
        <h1 className="text-4xl font-bold text-center text-[#519335]">
          طلب مزارع محترف
        </h1>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-[#519335] mb-6 text-center">
            احصل على مساعدة محترفة للعناية بنباتاتك
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-4 rtl:space-x-reverse">
              <div className="flex-1 relative">
                <UserIcon className="h-5 w-5 text-[#7ed958] absolute top-3 right-3 rtl:left-3 rtl:right-auto" />
                <input
                  type="text"
                  name="name"
                  placeholder="الاسم الكامل"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 pr-10 rtl:pl-10 border-2 border-[#7ed958] rounded-lg focus:outline-none focus:border-[#86E85D]"
                  required
                />
              </div>
              <div className="flex-1 relative mt-4 md:mt-0">
                <PhoneIcon className="h-5 w-5 text-[#7ed958] absolute top-3 right-3 rtl:left-3 rtl:right-auto" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="رقم الهاتف"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 pr-10 rtl:pl-10 border-2 border-[#7ed958] rounded-lg focus:outline-none focus:border-[#86E85D]"
                  required
                />
              </div>
            </div>

            <div className="relative">
              <MailIcon className="h-5 w-5 text-[#7ed958] absolute top-3 right-3 rtl:left-3 rtl:right-auto" />
              <input
                type="email"
                name="email"
                placeholder="البريد الإلكتروني"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 pr-10 rtl:pl-10 border-2 border-[#7ed958] rounded-lg focus:outline-none focus:border-[#86E85D]"
                required
              />
            </div>

            <div className="relative">
              <LocationMarkerIcon className="h-5 w-5 text-[#7ed958] absolute top-3 right-3 rtl:left-3 rtl:right-auto" />
              <input
                type="text"
                name="address"
                placeholder="العنوان"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 pr-10 rtl:pl-10 border-2 border-[#7ed958] rounded-lg focus:outline-none focus:border-[#86E85D]"
                required
              />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 rtl:space-x-reverse">
              <div className="flex-1 relative">
                <CalendarIcon className="h-5 w-5 text-[#7ed958] absolute top-3 right-3 rtl:left-3 rtl:right-auto" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-2 pr-10 rtl:pl-10 border-2 border-[#7ed958] rounded-lg focus:outline-none focus:border-[#86E85D]"
                  required
                />
              </div>
              <div className="flex-1 relative mt-4 md:mt-0">
                <ClockIcon className="h-5 w-5 text-[#7ed958] absolute top-3 right-3 rtl:left-3 rtl:right-auto" />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-2 pr-10 rtl:pl-10 border-2 border-[#7ed958] rounded-lg focus:outline-none focus:border-[#86E85D]"
                  required
                />
              </div>
            </div>

            <div>
              <textarea
                name="description"
                placeholder="صف مشكلة النبات أو نوع المساعدة التي تحتاجها"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-2 border-2 border-[#7ed958] rounded-lg focus:outline-none focus:border-[#86E85D]"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-bottonpri hover:bg-hoverpri text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              إرسال الطلب
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default RequestFarmer;
