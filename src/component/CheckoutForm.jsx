import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import "./CheckoutForm.css";

import axios from "axios"; //required in future

export default function CheckoutForm({ clientSecret, course }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
     
      clientSecret, 
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      setMessage(error.message);
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      setMessage("Payment Successful 🎉");
      setLoading(false);

      // TODO: call backend to enroll user in course
    }
  };

  return (
  <div className="checkout-wrapper">
    <form onSubmit={handleSubmit} className="checkout-card">
      <h2 className="checkout-title">Complete Payment</h2>
      <div className="card-box"> 
            <h2 className="checkout-title">{course.title}</h2>

        <div style={{
            display:"flex",
            justifyContent:"space-between",
            marginBottom:"20px",
            fontWeight:"500"
        }}>
        <span>Price</span>
        <span>₹ {course.price}</span>
        </div>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": {
                  color: "#aab7c4"
                }
              },
              invalid: {
                color: "#fa755a"
              }
            }
          }}
        />
      </div>

      <button className="pay-btn" disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>

      {message && <p className="message">{message}</p>}
    </form>
  </div>
);

}
