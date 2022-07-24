import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import logo from '../../assets/logo/logofoodoclock.png'
import { FaUserAlt,FaRedoAlt } from 'react-icons/fa';
import avatar from '../../assets/img_avatar.png'
import { reactLocalStorage } from 'reactjs-localstorage';


const FormTopNavBar = (props) => {

    const token_key = reactLocalStorage.get('token_key');
    const navigation = useNavigate()  

    let handleLogout = async (e) => {
        try {
          let res = await fetch('http://127.0.0.1:8000/api/v1/auth/user/logout',{
            method: 'POST',
            headers:{
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token_key}`}
          })
          const data = await res.json();
          if (res.status === 200) {
            reactLocalStorage.clear();
            navigation('/login')
          }
        }catch(error){
          console.error(error)
        }
      }
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
          <div className="account-login">
                <Link to='/editprofile'><img src={avatar} style={{width:'50px',height:'50px',borderRadius:'50%' }}/></Link>
                <span 
                onClick={handleLogout}
                style={{verticalAlign:'top'}}
                > logout</span>
          </div>
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