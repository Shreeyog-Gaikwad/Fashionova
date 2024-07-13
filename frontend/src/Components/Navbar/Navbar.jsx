import React, { useContext, useState, useRef } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png';
import {Link} from "react-router-dom"
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/dropdown_icon.png' 



const Navbar = () => {

  const [menu, setmenu] = useState("shop");
  const {getTotalItems} = useContext(ShopContext)
  const menuRef = useRef();

  const dropdown_toggle = (e) =>{
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <h1>Fashionova</h1>
      </div>
      <div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className='nav-menu' >
          <li onClick={()=>{setmenu("shop")}}> <Link to="/" style={{textDecoration:"none", color:'black'}}>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
          <li onClick={()=>{setmenu("mens")}}> <Link to="/mens" style={{textDecoration:"none", color:'black'}}>Mens</Link> {menu==="mens"?<hr/>:<></>}</li>
          <li onClick={()=>{setmenu("womens")}}> <Link to="/womens" style={{textDecoration:"none", color:'black'}}>Womens</Link> {menu==="womens"?<hr/>:<></>}</li>
          <li onClick={()=>{setmenu("kids")}}> <Link to="/kids" style={{textDecoration:"none", color:'black'}}>Kids</Link> {menu==="kids"?<hr/>:<></>}</li>
        </ul>
      </div>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')? <button onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>:<Link to="/login"><button>Login</button></Link>}
          
          <Link to="/cart"><img src={cart_icon} alt="" /></Link>
          <div className="nav-cart-count">{getTotalItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
