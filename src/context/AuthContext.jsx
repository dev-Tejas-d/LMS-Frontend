import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const Authcontext = createContext();


function AuthProvider({children}){
    const [token, setToken] = useState(null);

    const API = import.meta.env.VITE_API_URL;

     useEffect(() => {
        const savedToken = localStorage.getItem("token");

        if (savedToken) {
            setToken(savedToken);
            axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
        }

    }, []);



    const login = async (email, password)=>{
        try{
            const {data} = await axios.post(`${API}/api/user/login`, {email, password});
            localStorage.setItem("token", data.Token);
            setToken(data.Token)
            axios.defaults.headers.common["Authorization"] = `Bearer ${data.Token}` ;
            return true;

        }catch(error){
            throw error;
        }
    }
    
    return (
    <Authcontext.Provider value={{token, setToken,login}}>
        {children}
    </Authcontext.Provider>
    )
}

export default AuthProvider;