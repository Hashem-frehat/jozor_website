import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import the Leaflet icon images
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

// إحداثيات عمان، الأردن
const center = [31.9454, 35.9284];

function LocationMarker({ onLocationChange }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationChange(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position} />;
}

function DeliveryAddress() {
  const [userDetails, setUserDetails] = useState({
    phoneNumber: "",
    addresses: [],
  });
  const [newAddress, setNewAddress] = useState({
    addressName: "",
    address: "",
    location: null,
  });
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = Cookies.get("tokenuser");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.userId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchAddresses(userId);
    }
  }, [userId]);

  const fetchAddresses = async () => {
    const token = Cookies.get("tokenuser");
    const decodedToken = jwtDecode(token);
    const userid = decodedToken.userId;
    try {
      const response = await axios.get(
        `http://localhost:3000/api/addresses/user/${userid}`
      );
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleLocationChange = async (latlng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`
      );
      const addressName = response.data.display_name; // جلب اسم المكان
      setNewAddress({
        ...newAddress,
        location: { type: "Point", coordinates: [latlng.lng, latlng.lat] },
        addressName, // تعيين اسم العنوان في حقل الإدخال
      });
    } catch (error) {
      console.error("Error fetching location name:", error);
    }
  };

  const handleAddressChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (userDetails.addresses.length >= 3) {
      alert("يمكنك إضافة 3 عناوين كحد أقصى.");
      return;
    }
    if (!newAddress.location) {
      alert("يرجى تحديد الموقع على الخريطة.");
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/addresses", {
        ...newAddress,
        userId,
      });
      setNewAddress({ addressName: "", address: "", location: null });
      fetchAddresses();
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleActivateAddress = async (addressId) => {
    try {
      await axios.put(
        `http://localhost:3000/api/addresses/activate/${addressId}`
      );
      fetchAddresses();
    } catch (error) {
      console.error("Error activating address:", error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await axios.delete(`http://localhost:3000/api/addresses/${addressId}`);
        fetchAddresses();
      } catch (error) {
        console.error("Error deleting address:", error);
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold p-6 border-b">عناوين التوصيل</h1>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-1/4 bg-gray-50 p-6 border-r">
            <Link
              className="block py-2 text-primary hover:text-primary-dark transition-colors"
              to="/myaccount"
            >
              معلومات الحساب
            </Link>
            <Link
              className="block py-2 text-primary hover:text-primary-dark transition-colors"
              to="/deliveryaddress"
            >
              عناوين التوصيل
            </Link>
            <Link
              className="block py-2 text-primary hover:text-primary-dark transition-colors"
              to="/myorders"
            >
              طلباتي
            </Link>
            <Link
              className="block py-2 text-primary hover:text-primary-dark transition-colors"
              to="#"
            >
              قسائم جوزور
            </Link>
          </div>
          <div className="w-3/4 p-6">
            <h2 className="text-xl font-semibold mb-4">عناوينك</h2>
            <p className="mb-4">رقم الهاتف: {userDetails.phoneNumber}</p>
            {userDetails.addresses.map((address) => (
              <div
                key={address._id}
                className="mb-4 p-4 border rounded flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{address.addressName}</h3>
                  <p>{address.address}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleActivateAddress(address._id)}
                    className={`px-4 py-2 rounded mr-2 ${
                      address.isactive
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {address.isactive ? "نشط" : "تفعيل"}
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(address._id)}
                    className="px-4 py-2 rounded bg-red-500 text-white"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}

            {userDetails.addresses.length < 3 && (
              <form onSubmit={handleAddAddress} className="mt-6">
                <h2 className="text-xl font-semibold mb-4">إضافة عنوان جديد</h2>
                <div className="mb-4">
                  <label htmlFor="addressName" className="block mb-2">
                    العنوان
                  </label>
                  <input
                    type="text"
                    id="addressName"
                    name="addressName"
                    value={newAddress.addressName} // هذا الحقل سيكون اسم المكان المحدد
                    onChange={handleAddressChange}
                    className="w-full p-2 border rounded"
                    readOnly // لجعل حقل الإدخال غير قابل للتعديل
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block mb-2">
                    اسم العنوان
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={newAddress.address} // يمكنك إدخال عنوان المكان هنا
                    onChange={handleAddressChange}
                    className="w-full p-2 border rounded"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">حدد الموقع على الخريطة</label>
                  <MapContainer
                    center={center}
                    zoom={13}
                    style={mapContainerStyle}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker onLocationChange={handleLocationChange} />
                  </MapContainer>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  إضافة عنوان
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryAddress;
