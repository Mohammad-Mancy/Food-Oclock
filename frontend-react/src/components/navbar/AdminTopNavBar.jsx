import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { FaUserAlt  } from 'react-icons/fa';
import { reactLocalStorage } from 'reactjs-localstorage';

const AdminTopNavBar = (props) => {

    const token_key = reactLocalStorage.get('token_key');
    const admin = reactLocalStorage.getObject('user');
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
    <div className="admin-topnavbar">
        <div>
            <h1>Admin Panel</h1>
        </div>
        <div className="account-login">
          {
            props.status === 'form-col'?
            <Link to='/manageCollection' className='back-link-form'>Back</Link>
            :props.status === 'form-col-rest'?
            <Link to='/manageRestaurant' className='back-link-form'>Back</Link>
            :
            <>
            <FaUserAlt/>
            <span
            onClick={handleLogout}
            > Logout</span>
            </>
          }

        </div>
    </div>
  )
}

export default AdminTopNavBar