import { NavLink } from 'react-router-dom'
import React from 'react'

const AdminMiddleNavBar = () => {
  return (
    <div className="admin-middlenavbar">
        <NavLink
        className="navbar__link"
        to="/manageReview"
        >
        Manage Review
        </NavLink>
        <NavLink
        className="navbar__link"
        to="/manageRestaurant"
        >
        Manage Restaurant
        </NavLink>
        <NavLink
        className="navbar__link"
        to="/manageUser"
        >
        Manage User
        </NavLink>
        
    </div>
  )
}

export default AdminMiddleNavBar