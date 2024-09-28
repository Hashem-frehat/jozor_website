import React, { useState, useEffect } from "react";
import axios from "axios";

import { Star, DollarSign, Briefcase, Phone, FileText } from "lucide-react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const Review = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [stars, setStars] = useState([]);
  useEffect(() => {
    const partner_id = sessionStorage.getItem("partner_id");
    fetchFeedback(partner_id);
  });
  const fetchFeedback = async (partner_id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/feedback/${partner_id}`
      );
      setFeedback(response.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const handleSubmitFeedback = async () => {
    const partner_id = sessionStorage.getItem("partner_id");
    try {
      const token = Cookies.get("tokenuser");
      if (!token) {
        alert("User ID is missing in cookies. Please log in.");
        return;
      } else {
        const decodedToken = jwtDecode(token);
        const userid = decodedToken.userId;
        console.log(userid);
        await axios.post("http://localhost:3000/api/feedback", {
          partnerid: partner_id,
          user_id: userid,
          rating,
          comment,
        });
        alert("Feedback submitted successfully!");
        setRating(0);
        setComment("");
        fetchFeedback(partner_id);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-blue-800 border-b pb-2">
        Feedback
      </h2>
      <div className="mb-4 flex justify-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={32}
            className={`cursor-pointer transition-colors duration-200 ${
              star <= rating
                ? "text-yellow-400 fill-current"
                : "text-gray-300 hover:text-yellow-200"
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Leave your comment..."
        rows="4"
      />
      <button
        onClick={handleSubmitFeedback}
        className="w-full bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-200 text-lg font-semibold"
      >
        Submit Feedback
      </button>

      <div className="mt-10 ">
        <h3 className="text-xl font-semibold mb-4 text-blue-800 border-b pb-2">
          Previous Feedback
        </h3>
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
          {feedback.map((item) => (
            <div
              key={item.feedback_id}
              className="bg-blue-50 p-4 rounded-lg shadow"
            >
              <p className="text-blue-700">{item.userId.firstName}</p>
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={`${
                      star <= item.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <p className="text-blue-700">{item.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
