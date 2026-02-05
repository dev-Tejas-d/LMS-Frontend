    import { createContext, useState, useEffect } from "react";

    export const Authcontext = createContext();


    function AuthProvider({children}){
        const [token, setToken] = useState(()=>{
        let storedToken= localStorage.getItem("token");
        return storedToken && storedToken !== "null"?storedToken:null;
    });

        useEffect(()=>{
            localStorage.setItem("token", token);
        }, [token])
        
        return (
        <Authcontext.Provider value={{token, setToken}}>
            {children}
        </Authcontext.Provider>
        )
    }

    export default AuthProvider;