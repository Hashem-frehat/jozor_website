import React, { useState, useEffect } from "react";
import axios from "axios";

const PartnerProfile = () => {
  const [partner, setPartner] = useState({
    address: "",
    storeName: "",
    storeCategory: "",
    storeRate: 0,
    description: "",
    photo: null,
  });
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    logo: null,
  });

  useEffect(() => {
    fetchPartnerData();
    fetchProducts();
  }, []);

  const fetchPartnerData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/partner");
      setPartner(response.data);
    } catch (error) {
      console.error("Error fetching partner data:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      if (response.headers["content-type"].includes("application/json")) {
        console.log("Fetched products:", response.data);
        setProducts(Array.isArray(response.data) ? response.data : []);
      } else {
        console.error(
          "Expected JSON but got:",
          response.headers["content-type"]
        );
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePartnerInfoChange = (e) => {
    setPartner({ ...partner, [e.target.name]: e.target.value });
  };

  const handlePhotoUpload = (e) => {
    setPartner({
      ...partner,
      photo: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleAddProduct = async () => {
    try {
      const productData = { ...newProduct };
      if (productData.discount === "") {
        delete productData.discount;
      }
      const response = await axios.post(
        "http://localhost:3000/products",
        productData
      );
      setProducts([...products, response.data]);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        discount: "",
        logo: null,
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleProductLogoUpload = (e) => {
    setNewProduct({
      ...newProduct,
      logo: URL.createObjectURL(e.target.files[0]),
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600">
          Partner Profile
        </h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            Store Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="storeName"
              value={partner.storeName}
              onChange={handlePartnerInfoChange}
              placeholder="Store Name"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="storeCategory"
              value={partner.storeCategory}
              onChange={handlePartnerInfoChange}
              placeholder="Store Category"
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="address"
              value={partner.address}
              onChange={handlePartnerInfoChange}
              placeholder="Address"
              className="p-2 border rounded"
            />
            <div className="p-2 border rounded bg-gray-100">
              <span className="font-semibold">Store Rate: </span>
              <span>{(partner.storeRate || 0).toFixed(1)}</span>
            </div>
            <textarea
              name="description"
              value={partner.description}
              onChange={handlePartnerInfoChange}
              placeholder="Description"
              className="p-2 border rounded col-span-2"
              rows="3"
            />
          </div>
          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="mb-2"
            />
            {partner.photo && (
              <img
                src={partner.photo}
                alt="Store Photo"
                className="w-32 h-32 object-cover rounded-full"
              />
            )}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            Add New Product
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Product Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Discount (optional)"
              value={newProduct.discount}
              onChange={(e) =>
                setNewProduct({ ...newProduct, discount: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleProductLogoUpload}
              className="col-span-2"
            />
          </div>
          <button
            onClick={handleAddProduct}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Add Product
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            Current Products
          </h2>
          <div className="space-y-4">
            {Array.isArray(products) &&
              products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center p-4 bg-gray-50 rounded-lg shadow"
                >
                  {product.logo && (
                    <img
                      src={product.logo}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-full mr-4"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="text-sm font-bold">{product.price} $</p>
                    {product.discount && (
                      <p className="text-sm text-gray-600">
                        Discount: {product.discount}
                      </p>
                    )}
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
