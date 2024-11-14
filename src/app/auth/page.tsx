'use client'
import Register from "./register";
import Login from "./login";
import { useState } from "react";

const Auth = () => {
    const [login, setLogin] = useState(false)

    return(
        <div className="md:flex bg-gray-900 text-gray-100 h-screen">
            {login ? 
            <Register changeLogin = {() => setLogin(!login)}/> :
            <Login changeRegister = {() => setLogin(!login)}/>
            }
        </div>
    )
}

export default Auth