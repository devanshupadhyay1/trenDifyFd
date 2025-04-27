import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // Render deployed backend URL from .env
  const API_URL = import.meta.env.VITE_API_URL;

  // Calculate total amount
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Handle payment submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("CardElement not found.");
      setLoading(false);
      return;
    }

    const result = await stripe.createToken(cardElement);

    const { token, error } = result;

    if (error) {
      console.error(error.message);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token.id,
          amount: totalAmount * 100, // amount in cents
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Payment successful!");
        setLoading(false);
        navigate("/thank-you"); // Use navigate instead of window.location
      } else {
        alert("Payment failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="space-y-4">
        {/* Cart Summary */}
        <div>
          <h3 className="font-semibold">Order Summary</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span>
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold mt-2">
            <span>Total: </span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Stripe Card Element */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h3 className="font-semibold">Payment Method</h3>
            <CardElement className="border p-2 rounded" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;