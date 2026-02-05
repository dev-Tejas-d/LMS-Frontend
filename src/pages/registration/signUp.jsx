import { useEffect, useRef, useState } from "react"
import "./signUp.style.css"
import axios from "axios";

export default function SignUp(){
    let nameInput = useRef();
    let emailInput = useRef();
    let passwordInput = useRef();

    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

    const API = import.meta.env.VITE_API_URL;


    let handleRegistration = async (e)=>{
        e.preventDefault();
        setError("");
        setSuccess("");
        let name = nameInput.current.value;
        let email = emailInput.current.value;
        let password = passwordInput.current.value;
        let emailRex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        let passRex = /^(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[a-z]).{8,}$/

        if(!emailRex.test(email)){
            setError("Please enter valid email");
        }else if(!passRex.test(password)){
            setError("Password must be of 8 character, atleat one capital letter and atleast one special character (@ $ ! % * ? &)")
        }else{
            try{

            
            let data = await axios.post(`${API}/api/user/registration`, {name, email, password});
            console.log(data.data);
            setSuccess(`Welcom ${name}, you have registered yourself successfully`);
            }catch(error){
                if(error.response){
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
                error?
                <div className="alert alert-danger" role="alert">
                {error}
                </div>:null
            }
            {
                success? <div className="alert alert-success" role="alert">
                {success}
                </div>:null
            }
          
           
             </div>
        </form>
         
        </>
    )
}