import { use, useEffect, useRef, useState } from "react"
import "./signUp.style.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";

export default function SignUp(){
    let nameInput = useRef();
    let emailInput = useRef();
    let passwordInput = useRef();

    let [error, setError] = useState("");
    let [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    const API = import.meta.env.VITE_API_URL;

    let handleRegistration = async (e)=>{
        e.preventDefault();
        setError("");
        setLoading(true);
        let name = nameInput.current.value;
        let email = emailInput.current.value;
        let password = passwordInput.current.value;
        let emailRex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        let passRex = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[a-z]).{8,}$/

        if(!emailRex.test(email)){
            setLoading(false);
            setError("Please enter valid email");
        }else if(!passRex.test(password)){
            setLoading(false);
            setError("Password must be of 8 character, atleat one capital letter and atleast one special character (@ $ ! % * ? &)")
        }else{
            try{
            let data = await axios.post(`${API}/api/user/registration`, {name, email, password});
            setLoading(false);
            navigate("/login");
            }catch(error){
                if(error.response){
                    setLoading(false)
                    setError(error.response.data.message);
                }else{
                    setError("Server error, please try again later");
                }
            }
        }
        
    }

    console.log(error)

    return (
          <>
        
        <form id="loginForm" onSubmit={(e)=>handleRegistration(e)}>
            <div id="form">
                <div id="formHeading">
                    <h3>Register yourself</h3>
                </div>
            <div id="inputs">
                <label htmlFor="Name">Name</label>
                <input id="Name" placeholder="Enter your fullname" ref={nameInput}></input>

                <label htmlFor="email">Email</label>
                <input id="email" placeholder="Enter your Email" ref={emailInput}></input>

                <label htmlFor="password">Password</label>
                <input id="password" placeholder=" Enter your password" ref={passwordInput}>
                </input>
                <i className="fa-solid fa-eye"></i>
                <button type="submit" id="reg" className="btn btn-primary" >Register</button>
            </div>
            {
                loading?<MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#1c3cd8"
                secondaryColor="#1c3cd8"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{
                    alignSelf:"center",
                    justifySelf:"center"
                }}
                wrapperClass=""
            />:
                error?
                <div className="alert alert-danger" role="alert">
                {error}
                </div>:null
            }
             </div>
        </form>
         
        </>
    )
}