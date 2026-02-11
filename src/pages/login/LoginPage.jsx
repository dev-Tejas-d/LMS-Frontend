import "./Login.css"

import axios from "axios";
import { useContext } from "react";
import { Authcontext } from "../../context/AuthContext";
import { useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function Login(){
    let states = useContext(Authcontext);
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [error, setError] = useState("");
    let [loading, setLoading] = useState(false);

     const API = import.meta.env.VITE_API_URL;

     let navigate = useNavigate();

   let handleLogin = async(e)=>{
        e.preventDefault();
        setError("");
        try{
            setLoading(true);
            let {data} = await axios.post(`${API}/api/user/login`, {email, password});
            setLoading(false);

            states.setToken(data.token);
            states.setProfileImg(data.profilePicture);
            navigate("/")
        }catch(err){
            if(err.response.data){
                setLoading(false);
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
            />: error? <div className="alert alert-danger" role="alert">{error}</div>:null
                    }

                <p>Don't have an account? <a href="/SignUp">Sign Up</a></p>
            </div>
             </div>
        </form>

         
        </>
    )
}

export default Login;