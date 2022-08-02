import React,{useEffect,useState,useRef,useReducer} from 'react'
import AdminMiddleNavBar from '../navbar/AdminMiddleNavBar'
import AdminTopNavBar from '../navbar/AdminTopNavBar'
import UserCard from './user/UserCard'
import { reactLocalStorage } from 'reactjs-localstorage'
import OrderBy from './button/OrderBy'

const ManageUser = () => {

  const user_type = reactLocalStorage.getObject('user').type;
  const token_key = reactLocalStorage.get('token_key');
  const [users,setUsers] = useState([]);
  const [filter, setFilter] = useState([]);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const filter_input = useRef();

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
        setFilter(data.users)
      }
    }catch(error){
      console.error(error)
    }
  }

  useEffect ( () => {
    handleUsers();
  },[]);

  const deleteUser = async (id) => {
    try{
      let res = await fetch('http://127.0.0.1:8000/api/v1/auth/admin/delete-user-account',{
        method: 'DELETE',
        headers:{
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token_key}`},
        body:JSON.stringify({
          type:user_type,
          id:id
      })
      })
      if(res.status === 204) {
        alert(`User account with ID : ${id} was Deleted`)
        window.location.reload();
      }
    }catch(error){
      console.error(error)
    }
  }

  const filterUsers = () => {
    var temp =[];
    setFilter([]);
    users.forEach(user => {
      if(
        user.email.toLowerCase().includes(filter_input.current.value.toLowerCase())
        ||
        user.phone_number.toLowerCase().includes(filter_input.current.value.toLowerCase())
        ){
            if(user in temp){
            }else{
                temp[temp.length] = user;
                setFilter(temp);
            }
        }
    });
  }

  const OrderByName = () => {
    filter.sort(function (a, b) {
      forceUpdate()
      return a.name.localeCompare(b.name);
    });
  }

  const OrderByDate = () => {
    filter.sort(function (a, b) {
      forceUpdate()
      return a.created_at.localeCompare(b.created_at);
    });
  }

  const OrderByEmail = () => {
    filter.sort(function (a, b) {
      forceUpdate()
      return a.email.localeCompare(b.email);
    });
  }

  return (
    <div className="manage-user">
        <AdminTopNavBar />
        <AdminMiddleNavBar />

        {/* Users Actions ( Order By and Search )*/}

        <div className="manage-users-actions">
          <div className="search">
             <input ref={filter_input} onInput={filterUsers} type="text" className='admin-search' placeholder='  email / phone number'/>
          </div> 
          <OrderBy byName={OrderByName} byDate={OrderByDate} byEmail={OrderByEmail} locate={'users'}/>
        </div>
        
        {/* ____________________________________ */}

        {/* users header */}
          <div className="user-card-header">
          <span>Username</span>
          <span>Email</span>
          <span>Phone number</span>
          <span>Action</span>
          </div>
          <hr className="user-card-devider" />
        {/* _____________ */}
        {filter.map(({id,name,email,phone_number}) => (
        <UserCard 
        key={id}
        name={name}
        email={email}
        phone_number={phone_number}
        onClick={ () => { deleteUser(id) }}
        />
        ))}
    </div>
  )
}

export default ManageUser