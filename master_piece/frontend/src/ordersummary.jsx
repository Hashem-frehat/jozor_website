import React from "react";

const OrderSummary = () => {
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
                <tr>
                  <td>Just notes</td>
                  <td>2</td>
                  <td>JOD 3.00</td>
                  <td>JOD 6.00</td>
                </tr>
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
            <h3 className="font-semibold mb-4">Payment Summary</h3>

            <div className="mb-4 border border-green-500 rounded-md p-4">
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="mr-2"
                  checked
                />
                <span className="font-semibold">Credit Card</span>
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Card Name"
                  className="w-full mb-2 p-2 border rounded"
                />
                <div className="flex mb-2">
                  <input
                    type="text"
                    placeholder="Card expiry date"
                    className="w-1/2 mr-2 p-2 border rounded"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Card verification value"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="mb-4 border rounded-md p-4">
              <label className="flex items-center">
                <input type="radio" name="paymentMethod" className="mr-2" />
                <span>Cash</span>
              </label>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>JOD 6.00</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Delivery fee</span>
              <span>JOD 0.50</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span>Service fee</span>
              <span>JOD 0.00</span>
            </div>
            <div className="flex justify-between font-semibold mb-4">
              <span>Total amount</span>
              <span>JOD 6.50</span>
            </div>

            <button className="w-full bg-bottonpri hover:bg-primary-dark text-white py-3 rounded-md text-lg font-semibold">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
