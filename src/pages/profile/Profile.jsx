import axios from "axios";
import { useEffect, useState } from "react"
import { useContext } from "react";
import { Authcontext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import "./Profile.css";

export default function Profile(){
    let [profile, setProfile] = useState({});
    let {token, logout} = useContext(Authcontext);
    
    const API = import.meta.env.VITE_API_URL;

    useEffect(()=>{
        let fetchUser = async ()=>{
            try{
                let user = await axios.get(`${API}/api/user/getUser`, {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            let userDetail = user.data;
            setProfile(userDetail.user);
            }catch(error){
                console.log(error)
            }
        }

        fetchUser();
    }, [])


    return (
        <>
            {
                profile?<>
                <div id="profileCont">
                    <div>
                        <div id="profileImgCont">
                            <img src={profile.profilePicture}></img>
                        </div>
                         <div id="profileDetail">
                        <h1>Name:{profile.name}</h1>
                        {
                            profile.phoneNumber?<h2 id="phoneNo">Phone No. {profile.phoneNumber}</h2>:<h2 id="phoneNo">Phone No. Please update these details</h2>
                        }
                        {
                            profile.gender?<h2 id="gender">Gender: {profile.gender}</h2>:<h2 id="gender">Gender:  Please update these details</h2>
                        }
                        {
                            profile.age?<h2 id="age">Age: {profile.age}</h2>:<h2 id="age">Age: Please update these details</h2>
                        }
                        <Link to="/updateProfile">Update profile</Link>
                
                        <Link to="/"onClick={()=>logout()}>
                                <button> Logout </button>
                        </Link>    
                    </div>
                    </div>
                   
                </div>
            </>:null
            }
           
        </>
    )
}