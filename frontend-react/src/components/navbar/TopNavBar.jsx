import React from 'react'
import logo from '../../assets/logo/logo-navbar.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa';
import { reactLocalStorage } from 'reactjs-localstorage';

const TopNavBar = (props) => {

  const token_key = reactLocalStorage.get('token_key');
  const user_image = reactLocalStorage.getObject('user').image;
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
    <div className="top-navbar">
        <Link to="/"><img src={logo}/></Link>
        {props.locate !== 'restPage'
        ?
        <div className="search">
          <input ref={props.myRef} onInput={props.onInput} type="text" className='search-input' placeholder='  Search  '/>
        </div> 
        :
        <div className='restaurant-welcome'>Welcome to our Restaurant</div> 
        }
        {props.status === 'logout'?
          <div className="account-login">
                <Link to='/editprofile'><img src={'http://127.0.0.1:8000/app/public/'+user_image} style={{width:'50px',height:'50px',borderRadius:'50%' }}/></Link>
                <span 
                onClick={handleLogout}
                style={{verticalAlign:'top'}}
                > logout</span>
          </div>
        :
          <div className="account-login">
            <Link to="/login" className='account-link'>
                <FaUserAlt/>
                <span> Login</span>
            </Link>
          </div>
        }
            
    </div>
  )
}

export default TopNavBar