import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CheckoutForm from "../../component/course/checkoutForm";



const stripeKey = import.meta.env.VITE_STRIPE_PUBLISH_KEY;
const stripePromise = loadStripe(stripeKey);



const CheckoutPage = ()=>{

    let [key, setkey] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect( ()=>{
        const clientKey = async ()=>{
            try{
                let res = await axios.post(`/api/payment/create-payment-intent/${id}`);
                console.log("RES"+res.data);
                setkey(res.data)
            }catch(error){
               navigate("/login");
            }
        }

       if (id) clientKey();
    },[id])

    return(
        <>
            {key && <Elements stripe={stripePromise} options={{clientSecret:key}}>
                    <CheckoutForm/>
                </Elements>}
        </>
    )
}

export default CheckoutPage;