import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MiddleNavBar() {
  return (
    <div className="middle-navbar">
        <NavLink
        className="navbar__link"
        to="/"
        >
        Restaurants
        </NavLink>
        <NavLink
        className="navbar__link"
        to="/collections"
        >
        Collections
        </NavLink>
    </div>
  )
}