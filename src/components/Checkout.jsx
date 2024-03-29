import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { selectTotalAmount } from "../redux/cartSlice";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe("pk_test_51NOvqGSAvExKFAjaCl4fAxmf3CFJlq54guOtblHh0nEuB7XGZ9KXvKSgHgjjiIc0kexx4SUn67Z4iXDBB9q3fevA0096oZR8bw");


const Checkout = () => {
    const [clientSecret, setClientSecret] = useState("");
    const totalAmount=useSelector(selectTotalAmount)
    useEffect(() => {
        fetch("https://server1-alpha.vercel.app//create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount:totalAmount}),
        })
          .then((res) => res.json())
          .then((data) => setClientSecret(data.clientSecret));
      }, []);
    
      const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };
    
      return (
        <div className="App">
          {clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          )}
        </div>
      );
}

export default Checkout
