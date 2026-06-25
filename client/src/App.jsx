import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { useEffect } from 'react'
import axios from 'axios'
import UserContext from './UserContext'
import { useContext } from 'react'
import UserDashboard from './pages/Dashboard'
import CreateBlog from './pages/CreateBlog'
import BlogDetails from './pages/BlogDetails'
import UpdateBlog from './pages/UpdateBlog'

const App = () => {

   let {login,user} = useContext(UserContext)
   let token = localStorage.getItem("token");


   useEffect(()=>{

    if(token){
         let header = {
      Authorization: "Bearer "+token
    }

    axios.get("http://localhost:3000/user/verify",{headers:header})
    .then((res)=>{
       login(res.data)
    })
    .catch((err)=>{
       console.log(err)
    })
    }

   },[])






  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={user?<UserDashboard/>:<Login/>}/>
        <Route path='/create-blog' element={<CreateBlog/>}/>
        <Route path='/update-blog/:id' element={<UpdateBlog/>}/>

      </Routes>
      
    </div>
  )
}

export default App
