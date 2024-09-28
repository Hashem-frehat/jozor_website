import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const Ratings = () => {
  const [ratings, setRatings] = useState([]);
  const [partnerId, setPartnerId] = useState(null);
  useEffect(() => {
    const fetchRatings = async () => {
      const token = Cookies.get("token");
      if (token) {
        const decoded = jwtDecode(token);
        setPartnerId(decoded.id); // Set partnerId based on decoded token
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/ratings/partner/${partnerId}`
        );
        setRatings(response.data);
      } catch (error) {
        console.error("Failed to fetch ratings", error);
      }
    };
    fetchRatings();
  }, [partnerId]);

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length
      : 0;

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Ratings and Reviews</h2>
      <p className="text-xl mb-4">
        Average Rating: {averageRating.toFixed(1)} / 5
      </p>
      <div className="space-y-4">
        {ratings.map((rating) => (
          <div key={rating._id} className="border p-4 rounded">
            <div className="flex justify-between items-center">
              <p className="font-bold">
                {rating.userId.firstName} {rating.userId.lastName}
              </p>
              <p className="text-yellow-500">{rating.rating} / 5</p>
            </div>
            {rating.comment && <p className="mt-2">{rating.comment}</p>}
            <p className="text-sm text-gray-500 mt-2">
              {new Date(rating.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
