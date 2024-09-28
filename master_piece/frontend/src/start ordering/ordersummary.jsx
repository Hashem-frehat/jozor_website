// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// const OrderSummary = () => {
//   const location = useLocation();
//   const { cartItems } = location.state || {};
//   const [partner, setPartner] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const subtotal = cartItems?.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   useEffect(() => {
//     const fetchPartner = async () => {
//       const partner_id = sessionStorage.getItem("partner_id");
//       if (!partner_id) return;

//       try {
//         const response = await axios.get(
//           `http://localhost:3000/api/partners/${partner_id}`
//         );
//         setPartner(response.data);
//       } catch (error) {
//         console.error("Failed to fetch partner", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPartner();
//   }, []);

//   // Only attempt to get deliveryFee and servicesFee if partner is not null
//   const deliveryFeeAmount = partner ? parseFloat(partner.deliveryFee) || 0 : 0;
//   const serviceFeeAmount = partner ? parseFloat(partner.serviesFee) || 0 : 0;

//   const total = subtotal + deliveryFeeAmount + serviceFeeAmount;

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="w-full bg-gray-100 p-4">
//       <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
//         <div className="p-6">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//           <div className="mb-6">
//             <h3 className="font-semibold mb-2">Tanween</h3>
//             <table className="w-full">
//               <thead>
//                 <tr className="text-left text-sm text-gray-600">
//                   <th>Items</th>
//                   <th>Qty</th>
//                   <th>Price</th>
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems?.map((item, index) => (
//                   <tr key={index}>
//                     <td>{item.name}</td>
//                     <td>{item.quantity}</td>
//                     <td>JOD {item.price.toFixed(2)}</td>
//                     <td>JOD {(item.price * item.quantity).toFixed(2)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="mb-6">
//             <h3 className="font-semibold mb-2">Delivery Address</h3>
//             <p className="text-sm">
//               Address name: Please CHANGE DELIVERY ADDRESS
//               <br />
//               Address: Al Rawabi Al Sharqi, Army Street, 1st Floor
//               <br />
//               Mobile: +962 7952 33988
//             </p>
//           </div>
//           <div>
//             <h3 className="font-semibold mb-4">Payment Summary</h3>
//             <div className="mb-4 border border-green-500 rounded-md p-4">
//               <label className="flex items-center mb-2">
//                 <input
//                   type="radio"
//                   name="paymentMethod"
//                   className="mr-2"
//                   checked
//                 />
//                 <span className="font-semibold">Credit Card</span>
//               </label>
//               <div className="mt-2">
//                 <input
//                   type="text"
//                   placeholder="Card Name"
//                   className="w-full mb-2 p-2 border rounded"
//                 />
//                 <div className="flex mb-2">
//                   <input
//                     type="text"
//                     placeholder="Card expiry date"
//                     className="w-1/2 mr-2 p-2 border rounded"
//                   />
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Card verification value"
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//             </div>
//             <div className="mb-4 border rounded-md p-4">
//               <label className="flex items-center">
//                 <input type="radio" name="paymentMethod" className="mr-2" />
//                 <span>Cash</span>
//               </label>
//             </div>
//             <div className="flex justify-between text-sm mb-2">
//               <span>Subtotal</span>
//               <span>JOD {subtotal?.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between text-sm mb-2">
//               <span>Delivery fee</span>
//               <span>JOD {deliveryFeeAmount}</span>
//             </div>
//             <div className="flex justify-between text-sm mb-2">
//               <span>Service fee</span>
//               <span>JOD {serviceFeeAmount}</span>
//             </div>
//             <div className="flex justify-between font-semibold mb-4">
//               <span>Total amount</span>
//               <span>JOD {total.toFixed(2)}</span>
//             </div>
//             <button className="w-full bg-bottonpri hover:bg-primary-dark text-white py-3 rounded-md text-lg font-semibold">
//               PLACE ORDER
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const OrderSummary = () => {
  const location = useLocation();
  const { cartItems } = location.state || {};
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const [paymentError, setPaymentError] = useState(null);

  const subtotal =
    cartItems?.reduce((total, item) => total + item.price * item.quantity, 0) ||
    0;

  useEffect(() => {
    const fetchPartner = async () => {
      const partner_id = sessionStorage.getItem("partner_id");

      if (!partner_id) return;

      try {
        const response = await axios.get(
          `http://localhost:3000/api/partners/${partner_id}`
        );
        setPartner(response.data);
      } catch (error) {
        console.error("Failed to fetch partner", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, []);

  const deliveryFeeAmount = partner ? parseFloat(partner.deliveryFee) || 0 : 0;
  const serviceFeeAmount = partner ? parseFloat(partner.serviesFee) || 0 : 0;
  const total = subtotal + deliveryFeeAmount + serviceFeeAmount;

  const handlePaymentCapture = async (details) => {
    const token = Cookies.get("tokenuser");
    const decodedToken = jwtDecode(token);
    const userid = decodedToken.userId;

    try {
      if (!userid) {
        alert("login first");
      } else {
        const response = await axios.post(
          "http://localhost:3000/api/payments",
          {
            user_id: userid,
            partner_id: partner._id,
            amount: total,
            payment_method: "PayPal",
            payment_date: new Date(),
            paypal_details: details,
          }
        );

        if (response.data.success) {
          setPaymentSuccess(true);
        } else {
          setPaymentError("Payment processing failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setPaymentError("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // إعداد خيارات PayPal
  const initialOptions = {
    "client-id":
      "AWrR0dEDBlc9AVYB7E-RbYM8HyZMGiRs_ibLN1lcJXBnv8DhZc1BuvhagRX5ycmsDSNQ3B5TxKya81_v",
    currency: "USD",
    intent: "capture",
  };

  return (
    <div className="w-full bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Tanween</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600">
                  <th>Items</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>JOD {item.price.toFixed(2)}</td>
                    <td>JOD {(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Delivery Address</h3>
            <p className="text-sm">
              Address name: Please CHANGE DELIVERY ADDRESS
              <br />
              Address: Al Rawabi Al Sharqi, Army Street, 1st Floor
              <br />
              Mobile: +962 7952 33988
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Payment Method</h3>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="cash"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={() => setPaymentMethod("cash")}
              />
              <label htmlFor="cash" className="ml-2">
                Cash
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="paypal"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
              />
              <label htmlFor="paypal" className="ml-2">
                PayPal
              </label>
            </div>

            <h3 className="font-semibold mb-4">Payment Summary</h3>
            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>JOD {subtotal?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Delivery fee</span>
              <span>JOD {deliveryFeeAmount}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Service fee</span>
              <span>JOD {serviceFeeAmount}</span>
            </div>
            <div className="flex justify-between font-semibold mb-4">
              <span>Total amount</span>
              <span>JOD {total.toFixed(2)}</span>
            </div>

            {/* Conditional rendering based on payment method */}
            {paymentSuccess ? (
              <div className="text-green-500 font-semibold">
                Payment was successful!
              </div>
            ) : paymentMethod === "paypal" ? (
              <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-white">
                  Pay with PayPal
                </h2>
                {paymentError && (
                  <p className="text-red-500 mb-4">{paymentError}</p>
                )}
                <PayPalScriptProvider options={initialOptions}>
                  <PayPalButtons
                    style={{ layout: "vertical", shape: "rect" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: { value: total.toString() },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then(handlePaymentCapture);
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            ) : (
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Confirm Cash Payment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
