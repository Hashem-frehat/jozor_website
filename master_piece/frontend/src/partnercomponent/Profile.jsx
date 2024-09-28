import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // تأكد من تثبيت الحزمة
import Cookies from "js-cookie";
import { storage } from "../firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

export const Profile = () => {
  const [partner, setPartner] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [partnerId, setPartnerId] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // لتخزين ملف الصورة

  // جلب بيانات الشريك عند تحميل الصفحة
  useEffect(() => {
    const fetchPartner = async () => {
      if (!partnerId) return; // Only fetch if partnerId is available

      try {
        const response = await axios.get(
          `http://localhost:3000/api/partners/${partnerId}`
        );
        setPartner(response.data);
        setProfileImage(response.data.profileImage); // تعيين الصورة الحالية إذا كانت موجودة
      } catch (error) {
        console.error("Failed to fetch partner", error);
        setError("Could not fetch partner data.");
      }
    };

    const token = Cookies.get("token");
    if (token) {
      const decoded = jwtDecode(token);
      setPartnerId(decoded.id); // Set partnerId based on decoded token
    }

    fetchPartner();
  }, [partnerId]);

  // تحديث بيانات الشريك عند التعديل
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // إذا كان هناك صورة جديدة، قم بتحميلها إلى Firebase Storage
      if (imageFile) {
        const storageRef = ref(storage, `profileImages/${partnerId}`); // إنشاء مرجع للصورة
        await uploadString(storageRef, imageFile, "data_url"); // تحميل الصورة
        const url = await getDownloadURL(storageRef); // الحصول على URL الصورة
        setProfileImage(url); // تحديث حالة URL الصورة
      }

      const updatedPartner = { ...partner, profileImage: profileImage }; // إضافة URL الصورة إلى بيانات الشريك
      const response = await axios.put(
        `http://localhost:3000/api/partners/${partnerId}`,
        updatedPartner
      );
      setPartner(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update partner", error);
      setError("Failed to update partner information.");
    }
  };

  // التعامل مع تغيير الصورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(reader.result); // حفظ ملف الصورة في حالة جديدة
      };
      reader.readAsDataURL(file); // تحويل الصورة إلى Base64
    }
  };

  if (!partner) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Partner Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col items-center mb-6">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full border-2 border-gray-300 mb-4"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
            <span className="text-white">No Image</span>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border rounded p-2 mb-4"
        />
        <button
          type="button"
          onClick={() => setProfileImage(null)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Remove Image
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={partner.firstName}
              onChange={(e) =>
                setPartner({ ...partner, firstName: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={partner.lastName}
              onChange={(e) =>
                setPartner({ ...partner, lastName: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={partner.phoneNumber}
              onChange={(e) =>
                setPartner({ ...partner, phoneNumber: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={partner.email}
              onChange={(e) =>
                setPartner({ ...partner, email: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="category"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              value={partner.catigory.join(", ")} // Assuming catigory is an array
              onChange={(e) =>
                setPartner({ ...partner, catigory: e.target.value.split(", ") })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="businessType"
            >
              Business Type
            </label>
            <input
              type="text"
              id="businessType"
              value={partner.businessType}
              onChange={(e) =>
                setPartner({ ...partner, businessType: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={partner.address}
              onChange={(e) =>
                setPartner({ ...partner, address: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="storeName"
            >
              Store Name
            </label>
            <input
              type="text"
              id="storeName"
              value={partner.storeName}
              onChange={(e) =>
                setPartner({ ...partner, storeName: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={partner.description}
              onChange={(e) =>
                setPartner({ ...partner, description: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="deliveryFee"
            >
              Delivery Fee
            </label>
            <input
              type="text"
              id="deliveryFee"
              value={partner.deliveryFee}
              onChange={(e) =>
                setPartner({ ...partner, deliveryFee: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="serviesFee"
            >
              servies Fee
            </label>
            <input
              type="text"
              id="serviesFee"
              value={partner.serviesFee}
              onChange={(e) =>
                setPartner({ ...partner, serviesFee: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </form>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {partner.firstName} {partner.lastName}
          </p>
          <p>
            <strong>Phone:</strong> {partner.phoneNumber}
          </p>
          <p>
            <strong>Email:</strong> {partner.email}
          </p>
          <p>
            <strong>Category:</strong> {partner.catigory.join(", ")}
          </p>
          <p>
            <strong>Business Type:</strong> {partner.businessType}
          </p>
          <p>
            <strong>Address:</strong> {partner.address}
          </p>
          <p>
            <strong>Store Name:</strong> {partner.storeName}
          </p>
          <p>
            <strong>Description:</strong> {partner.description}
          </p>
          <p>
            <strong>Delivery Fee:</strong> {partner.deliveryFee}
          </p>
          <p>
            <strong>serviesFee :</strong> {partner.serviesFee}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};
