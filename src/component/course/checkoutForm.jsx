import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import "../course/checkoutForm.css"

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    setError(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // change this later
        return_url: "http://localhost:5173",
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="checkout-form">
        <div id="PaymentEle">
            <PaymentElement />
        </div>
      <button disabled={!stripe || isLoading} id="payNow">
        {isLoading ? "Processing..." : `Pay Now `}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
