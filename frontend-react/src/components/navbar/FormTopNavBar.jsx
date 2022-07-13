import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo/logofoodoclock.png'
import { FaUserAlt,FaRedoAlt } from 'react-icons/fa';

const FormTopNavBar = (props) => {
  return (
    <div className="form-top-navbar">
        <div>
            <FaRedoAlt style={{width : '30px', height :'30px' , color : "#fff"}} />
            <Link to='/' className='back-form-link'>    
                <span> Back</span>
            </Link>
        </div>

        <img src={logo} className="logo-foodoclock" />

        <div>
        {props.status
        ?
        <>
            <FaUserAlt style={{width : '30px', height :'30px'}} />
            <Link to="/signup" className='signup-form-navbar'> Signup</Link>
        </>
        :
        <>
            <FaUserAlt style={{width : '30px', height :'30px'}}/>
            <Link to="/login" className='login-form-navbar'> Login</Link>
        </>
        }
        </div>
    </div>
  )
}

export default FormTopNavBar