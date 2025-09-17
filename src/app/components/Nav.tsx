import React from 'react'
import { Link } from 'react-router-dom';
function Nav() {
  return (
    <div className="navbar-content">
      <Link to="/home" className="logo">Booking.com</Link>
      <div className="navs">
        <a href="#">LAK</a>
        <Link to="/register" className="btn">
          Register
        </Link>
       <Link to="/login" className="btn">
          Login
        </Link>
      </div>
    </div>
  )
}

export default Nav