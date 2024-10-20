import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
export const Products = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    namear: "",
    description: "",
    descriptionar: "",
    price: "",
  });
  const [partnerId, setPartnerId] = useState(null);
  const [photo, setPhoto] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const token = Cookies.get("token");
      if (token) {
        const decoded = jwtDecode(token);
        setPartnerId(decoded.id); // Set partnerId based on decoded token
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/partner/${partnerId}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchProducts();
  }, [partnerId]);
  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // إضافة معلومات المنتج إلى formData
    formData.append("name", newProduct.name);
    formData.append("namear", newProduct.namear);
    formData.append("description", newProduct.description);
    formData.append("descriptionar", newProduct.descriptionar);
    formData.append("price", newProduct.price);
    formData.append("partnerId", partnerId);

    // إضافة الصورة إذا كانت موجودة
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProducts([...products, response.data]);
      setNewProduct({
        name: "",
        namear: "",
        description: "",
        descriptionar: "",
        price: "",
      });
      setPhoto(null);
    } catch (error) {
      console.error("Failed to add product", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <form onSubmit={handleAddProduct} className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Product Name in arabic"
          value={newProduct.namear}
          onChange={(e) =>
            setNewProduct({ ...newProduct, namear: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Description in arabic"
          value={newProduct.descriptionar}
          onChange={(e) =>
            setNewProduct({ ...newProduct, descriptionar: e.target.value })
          }
          className="w-full p-2 border rounded"
        />

        <div>
          <label className="block mb-1">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded">
            <img
              src={`http://localhost:3000/${product.photo}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button
              onClick={() => handleDeleteProduct(product._id)}
              className="bg-red-500 text-white px-2 py-1 rounded mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
