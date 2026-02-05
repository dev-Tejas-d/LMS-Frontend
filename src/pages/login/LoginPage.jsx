import "./Login.css"

import axios from "axios";
import { useContext } from "react";
import { Authcontext } from "../../context/AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(){

    let states = useContext(Authcontext);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

     const API = import.meta.env.VITE_API_URL;

   let handleLogin = async(e)=>{
        e.preventDefault();
        setError("");
        try{
            let {data} = await axios.post(`${API}/api/user/login`, {email, password});

            setSuccess(`Hello ${email}, Login successful!.`);
            states.setToken(data.token);
        }catch(err){
            if(err.response.data){
                setError(err.response.data.message);
            }
        }
   }

    return (
        <>        
        <form onSubmit={(e)=>handleLogin(e)} id="loginForm">
            <div id="form">
                <div id="formHeading">
                    <h3>Login into your account</h3>
                </div>
            <div id="inputs">
                <label htmlFor="email">Email</label>
                <input id="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}></input>
                <div id="remberMeSection">
                    <div>
                        <input type="checkbox" id="remME"></input>
                        <label htmlFor="remME">Remember me</label>
                    </div>
                    <div>
                        <a href="/">Forgot your password?</a>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
                    {
                        error? <div className="alert alert-danger" role="alert">{error}</div>:null
                    }
                    {
                        success?<div className="alert alert-success" role="alert">{success}</div>:null
                    }
                <p>Don't have an account? <a href="/SignUp">Sign Up</a></p>
            </div>
             </div>
        </form>

         
        </>
    )
}

export default Login;