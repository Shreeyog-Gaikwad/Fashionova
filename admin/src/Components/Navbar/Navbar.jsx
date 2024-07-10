import React from 'react'
import "./Navbar.css"
import navlogo from "../../assets/logo.png"
import navProfile from "../../assets/nav-profile.svg"

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='nav-right'>
        <img src={navlogo} className='nav-logo' alt="" />
        <div className='nav-logo-content'>
          <h1>Fashionova</h1>
          <p>Admin Panel</p>
        </div>
      </div>
      <img src={navProfile} className='nav-profile' alt="" />
      
    </div>
  )
}

export default Navbar
