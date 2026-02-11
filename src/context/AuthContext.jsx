import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Authcontext = createContext();

function AuthProvider({children}){
        const [token, setToken] = useState(()=>{
        let storedToken= localStorage.getItem("token");
        return storedToken && storedToken !== "null"?storedToken:null;
    });
        let [profileImg, setProfileImg] = useState(()=>{
            let profilePic = localStorage.getItem("profilePic");
            return profilePic && profilePic !== "null"?profilePic:"https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg"
        });

        useEffect(()=>{
            localStorage.setItem("token", token);
            localStorage.setItem("profilePic", profileImg);
        }, [token, profileImg])

        let logout = ()=>{
            localStorage.removeItem("token");
            setToken(null);
        }
        
        return (
        <Authcontext.Provider value={{token, setToken, logout, setProfileImg, profileImg}}>
            {children}
        </Authcontext.Provider>
        )
    }

    export default AuthProvider;