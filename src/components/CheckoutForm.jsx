import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Col, Container, Row } from "react-bootstrap";
import CheckoutSummary from "./CheckoutSummary";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { selectUserEmail, selectUserId } from "../redux/authSlice";
import { EMPTY_CART, selectCartItems, selectTotalAmount } from "../redux/cartSlice";
import { selectShippingAddress } from "../redux/checkoutSlice";
import { db } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {return;  }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret");
    if (!clientSecret) {return;  }
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) { return;  }
    setIsLoading(true);
    await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/checkout-success",
      },redirect:"if_required"
     }).then((result)=>{
        if(result.error){toast.error(result.error.message);return}
        if(result.paymentIntent){
            if(result.paymentIntent.status=="succeeded"){
                setIsLoading(false)
                toast.success("payment done")
                //save order
                saveorder() 
            }
        }
     })
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  const userId=useSelector(selectUserId)
  const userEmail=useSelector(selectUserEmail)
  const totalAmount=useSelector(selectTotalAmount)
  const cartItems=useSelector(selectCartItems)
  const shippingAddress=useSelector(selectShippingAddress)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  let saveorder=async()=>{
    const today=new Date()
    const orderDate=today.toLocaleDateString()
    const orderTime=today.toLocaleTimeString()
    const orderConfig={
        orderDate, orderTime, userId, userEmail, totalAmount, cartItems, orderStatus:"Order Placed", 
        createdAt:Timestamp.now().toMillis(),shippingAddress
    }
    try{
        const docRef=collection(db,"orders")
        await addDoc(docRef,orderConfig)

        emailjs.send('service_yhfpjt6', 'template_qyp9c3b',{email:userEmail,amount:totalAmount,order_status:orderConfig.orderStatus}, {
          publicKey: 'ouyyULNr1Fl9QYxiJ',
        }).then(() => {
            toast.success("order placed")
            navigate('/checkout-success')
            dispatch(EMPTY_CART()) },
          (error) => { toast.error(error.text) },
        );       
    }
    catch(error){
        toast.error(error.message)
    }
  }

  return (
    <Container className="mt-5 shadow p-2">
    <Row>
        <Col><CheckoutSummary/>  </Col>
            <Col>
            <h1>Stripe Payment Checkout</h1><hr/>
            <form id="payment-form" onSubmit={handleSubmit}>

      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <div class="d-grid gap-2">
        <button disabled={isLoading || !stripe || !elements} id="submit" className="btn btn-primary mt-2">
            <span id="button-text">
            {isLoading ? <div class="d-flex justify-content-center">
                        <div class="spinner-border text-warning" role="status">
                        </div>
                        </div> : "Pay now"}
            </span>
        </button>
      </div>
      
     
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
            </Col>
    </Row>
    </Container>
  );
}