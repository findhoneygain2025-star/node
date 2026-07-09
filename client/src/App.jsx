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
import HelpCenter from './pages/footerLinks/HelpCenter'
import TermsOfService from './pages/footerLinks/TermsOfService'
import AboutUs from './pages/footerLinks/AboutUs'
import PrivacyPolicy from './pages/footerLinks/PrivacyPolicy'
import CookieSettings from './pages/footerLinks/CookieSettings'
import {ToastContainer} from 'react-toastify'
const API_BASE = import.meta.env.VITE_API_URL;

const App = () => {

  let { login, user } = useContext(UserContext)
  let token = localStorage.getItem("token");


  useEffect(() => {

    if (token) {
      let header = {
        Authorization: "Bearer " + token
      }

      axios.get(`${API_BASE}/user/verify`, { headers: header })
        .then((res) => {
          login(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

  }, [])

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={user ? <UserDashboard /> : <Login />} />
        <Route path='/create-blog' element={<CreateBlog />} />
        <Route path='/update-blog/:id' element={<UpdateBlog />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookie-settings" element={<CookieSettings />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  )
}

export default App
