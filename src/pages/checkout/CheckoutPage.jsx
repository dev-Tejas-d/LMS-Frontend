import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CheckoutForm from "../../component/CheckoutForm";
import { useContext } from "react";
import { Authcontext } from "../../context/AuthContext";


const stripeKey = import.meta.env.VITE_STRIPE_PUBLISH_KEY;
const stripePromise = loadStripe(stripeKey);


const CheckoutPage = ()=>{
    let {token} = useContext(Authcontext);

    let [key, setkey] = useState("");
    let [course, setCourse] = useState(null)
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
                setkey(res.data.clientSecret);
                setCourse(res.data.course);
            }catch(error){
               navigate("/login");
            }
        }
        if(!id || !token) return;
       clientKey();
    },[id, token])


    return(
        <>
            {key && course && (
        <Elements stripe={stripePromise} options={{ clientSecret: key }}>
            <CheckoutForm clientSecret={key} course={course}/>
        </Elements>
)}
        </>
    )
}

export default CheckoutPage;