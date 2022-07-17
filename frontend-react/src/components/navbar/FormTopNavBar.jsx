import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo/logofoodoclock.png'
import { FaUserAlt,FaRedoAlt } from 'react-icons/fa';

const FormTopNavBar = (props) => {
  return (
    <div className="form-top-navbar">
        <div style={{ width: '150px' }}>
            <FaRedoAlt style={{width : '30px', height :'30px' , color : "#fff"}} />
            <Link to='/' className='back-form-link'>    
                <span> Back</span>
            </Link>
        </div>

        <img src={logo} className="logo-foodoclock" />

        <div>
        {props.status === true
        ?
        <>
            <FaUserAlt style={{width : '30px', height :'30px'}} />
            <Link to="/signup" className='signup-form-navbar'> Signup</Link>
        </>
        :props.status === 'logout'?
        <>
            <FaUserAlt style={{width : '30px', height :'30px', color : '#fff' }}/> 
            <Link to="/" className='logout-link'> Logout</Link>
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