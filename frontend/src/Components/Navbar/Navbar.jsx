import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png';
import {Link} from "react-router-dom"
import { ShopContext } from '../../Context/ShopContext';



const Navbar = () => {

  const [menu, setmenu] = useState("shop");
  const {getTotalItems} = useContext(ShopContext)

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <h1>Fashionova</h1>
      </div>
      <div className="nav-menu">
        <ul>
          <li onClick={()=>{setmenu("shop")}}> <Link to="/" style={{textDecoration:"none", color:'black'}}>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
          <li onClick={()=>{setmenu("mens")}}> <Link to="/mens" style={{textDecoration:"none", color:'black'}}>Mens</Link> {menu==="mens"?<hr/>:<></>}</li>
          <li onClick={()=>{setmenu("womens")}}> <Link to="/womens" style={{textDecoration:"none", color:'black'}}>Womens</Link> {menu==="womens"?<hr/>:<></>}</li>
          <li onClick={()=>{setmenu("kids")}}> <Link to="/kids" style={{textDecoration:"none", color:'black'}}>Kids</Link> {menu==="kids"?<hr/>:<></>}</li>
        </ul>
      </div>
      <div className="nav-login-cart">
          <Link to="/login"><button>Login</button></Link>
          <Link to="/cart"><img src={cart_icon} alt="" /></Link>
          <div className="nav-cart-count">{getTotalItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
