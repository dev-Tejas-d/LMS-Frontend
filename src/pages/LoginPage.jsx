import "./Login.css"
import { useContext } from "react";
import { Authcontext } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

    let states = useContext(Authcontext);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");
    let [validation, setValidation] = useState(false);
    const navigate = useNavigate();

   let handleLogin = async(e)=>{
        e.preventDefault();
        setError("");
        try{
            let result = await states.login(email, password);
            if(result.Token){
                navigate("/");
            }
        }catch(err){
            if (err.response.data) {
                setError(err.response.data);
                console.log(error);
            } 
            else {
                setError("Something went wrong. Please try again.");
            }
        }
       
   }
    return (
        <>        
        <form onSubmit={handleLogin} id="loginForm">
            {error?<div id="ErrDiv">
            <h1>{error}</h1>
         </div>:null}
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

                <p>Don't have an account? <a href="/SignUp">Sign Up</a></p>
            </div>
           
             </div>
        </form>
         
        </>
    )
}

export default Login;