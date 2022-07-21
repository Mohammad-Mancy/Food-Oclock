import React,{useEffect,useState} from 'react'
import AdminMiddleNavBar from '../navbar/AdminMiddleNavBar'
import AdminTopNavBar from '../navbar/AdminTopNavBar'
import UserCard from './user/UserCard'
import { reactLocalStorage } from 'reactjs-localstorage'

const ManageUser = () => {

  const user_type = reactLocalStorage.getObject('user').type;
  const token_key = reactLocalStorage.get('token_key');
  const [users,setUsers] = useState([]);

  let handleUsers = async (e) => {
    try{
      let res = await fetch('http://127.0.0.1:8000/api/v1/auth/admin/get-users',{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token_key}`},
        body:JSON.stringify({
          type:user_type
      })
      })
      const data = await res.json();
      if(res.status === 200) {
        setUsers(data.users)
      }
    }catch(error){
      console.error(error)
    }
  }

  useEffect ( () => {
    handleUsers();
  },[]);

  return (
    <div className="manage-user">
        <AdminTopNavBar />
        <AdminMiddleNavBar />

        {/* users header */}
          <div className="user-card-header">
          <span>Username</span>
          <span>Email</span>
          <span>Phone number</span>
          <span>Action</span>
          </div>
          <hr className="user-card-devider" />
        {/* _____________ */}
        {users.map(({id,name,email,phone_number}) => (
        <UserCard 
        key={id}
        name={name}
        email={email}
        phone_number={phone_number}
        />
        ))}
    </div>
  )
}

export default ManageUser