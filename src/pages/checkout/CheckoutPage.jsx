import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CheckoutForm from "../../component/course/checkoutForm";
import { useContext } from "react";
import { Authcontext } from "../../context/AuthContext";


const stripeKey = import.meta.env.VITE_STRIPE_PUBLISH_KEY;
const stripePromise = loadStripe(stripeKey);


const CheckoutPage = ()=>{
    let {token} = useContext(Authcontext);

    let [key, setkey] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();

    const API = import.meta.env.VITE_API_URL;

    useEffect( ()=>{
        const clientKey = async ()=>{
            try{
                let res = await axios.post(`${API}/api/payment/create-payment-intent/${id}`,{}, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });

                setkey(res.data)
            }catch(error){
               navigate("/login");
            }
        }
        if(!id || !token) return;
       clientKey();
    },[id, token])

    console.log(key)
    return(
        <>
            {key && <Elements stripe={stripePromise} options={{clientSecret:key}}>
                    <CheckoutForm/>
                </Elements>}
        </>
    )
}

export default CheckoutPage;