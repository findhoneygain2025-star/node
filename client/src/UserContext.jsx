import React from 'react'
import { useState } from 'react';

const UserContext = React.createContext();

export default UserContext;


const UsercontextProvider = ({children})=>{

    const[user,setUser] = useState(null);

    function login(data){
        setUser(data)
    }

    function logout(){
        setUser(null)
        localStorage.removeItem("token")
    }

    return (
        <UserContext.Provider value={{user,login,logout}}>
           {children}
        </UserContext.Provider>
    )
}

export {UsercontextProvider};