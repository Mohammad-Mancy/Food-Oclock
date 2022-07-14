import React from 'react'
import logo from '../../assets/logo/logo-navbar.png'
import { Link } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa';

const TopNavBar = (props) => {
  return (
    <div className="top-navbar">
        <Link to="/"><img src={logo}/></Link>
        {props.status
        ?
        <div className="search">
          <input type="text" className='search-input' placeholder='Search for a restaurant'/>
        </div> 
        :
        <div className='restaurant-welcome'>Welcome to our Restaurant</div> 
        }

            <div className="account-login">
                <Link to="/login" className='account-link'>
                    <FaUserAlt/>
                    <span> Login</span>
                </Link>
            </div>

    </div>
  )
}

export default TopNavBar