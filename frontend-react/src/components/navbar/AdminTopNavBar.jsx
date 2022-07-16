import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserAlt,FaRedoAlt  } from 'react-icons/fa';

const AdminTopNavBar = () => {
  return (
    <div className="admin-topnavbar">
        <div>
            <FaRedoAlt style={{width : '30px', height :'30px' , color : "#fff"}} />
            <Link to='/login' className='back-form-link'>    
                <span> Back</span>
            </Link>
        </div>
        <div>
            <h1>Admin Panel</h1>
        </div>
        <div className="account-login">
                <Link to="/" className='account-link'>
                    <FaUserAlt/>
                    <span> Logout</span>
                </Link>
            </div>
    </div>
  )
}

export default AdminTopNavBar