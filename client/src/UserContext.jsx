import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
const UserContext = React.createContext();

export default UserContext;


const UsercontextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    function login(data) {
        setUser(data)
    }

    function logout() {
        if (confirm("Are you sure you want to logout?")) {
            setUser(null)
            localStorage.removeItem("token")
            toast.success("Logout successfully");
        } else {
            console.log("Action canceled by user.");
        }
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export { UsercontextProvider };