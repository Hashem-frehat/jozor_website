import React, { useState } from "react";

const PartnerProfile = () => {
  const [storeInfo, setStoreInfo] = useState({
    name: "tanween",
    description: "Sapling, Agricultural materials, seeds",
    rating: 4,
    logo: null,
  });
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  // Simulated statistics
  const statistics = {
    sales: 1234,
    customers: 567,
    rating: 4.5,
  };

  const handleStoreInfoChange = (e) => {
    setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value });
  };

  const handleLogoUpload = (e) => {
    setStoreInfo({
      ...storeInfo,
      logo: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleAddProduct = () => {
    setProducts([...products, newProduct]);
    setNewProduct({ name: "", description: "", price: "", image: null });
  };

  const handleProductImageUpload = (e) => {
    setNewProduct({
      ...newProduct,
      image: URL.createObjectURL(e.target.files[0]),
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
          الملف الشخصي للشريك
        </h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            معلومات المتجر
          </h2>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
              {storeInfo.logo ? (
                <img
                  src={storeInfo.logo}
                  alt="شعار المتجر"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  شعار
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="mb-2"
              />
              <input
                type="text"
                name="name"
                value={storeInfo.name}
                onChange={handleStoreInfoChange}
                placeholder="اسم المتجر"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                name="description"
                value={storeInfo.description}
                onChange={handleStoreInfoChange}
                placeholder="وصف المتجر"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-2">التقييم:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`text-2xl ${
                  star <= storeInfo.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            إحصائيات المتجر
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-100 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-green-800">المبيعات</h3>
              <p className="text-2xl font-bold text-green-600">
                {statistics.sales} د.أ
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-blue-800">عدد الزبائن</h3>
              <p className="text-2xl font-bold text-blue-600">
                {statistics.customers}
              </p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg text-center">
              <h3 className="font-semibold text-yellow-800">التقييم العام</h3>
              <p className="text-2xl font-bold text-yellow-600">
                {statistics.rating} / 5
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            إضافة منتج جديد
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="اسم المنتج"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="وصف المنتج"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="السعر"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProductImageUpload}
            />
          </div>
          <button
            onClick={handleAddProduct}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            إضافة منتج
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            المنتجات الحالية
          </h2>
          <div className="space-y-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-gray-50 rounded-lg shadow"
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-full mr-4"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                  <p className="text-sm font-bold">{product.price} د.أ</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerProfile;
