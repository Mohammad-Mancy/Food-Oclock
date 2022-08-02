import React,{useState,useEffect,useReducer, useRef} from 'react'
import AdminMiddleNavBar from '../navbar/AdminMiddleNavBar'
import AdminTopNavBar from '../navbar/AdminTopNavBar'
import AdminRestaurantCard from './restaurant/AdminRestaurantCard'
import { reactLocalStorage } from 'reactjs-localstorage'
import { Link, useNavigate } from 'react-router-dom'
import OrderBy from './button/OrderBy'

const ManageRestaurant = () => {

  const user_type = reactLocalStorage.getObject('user').type;
  const token_key = reactLocalStorage.get('token_key');
  const [restaurants,setRestaurants] = useState([]);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const [filter, setFilter] = useState([]);
  const filter_input = useRef();

  let handleRestaurants = async (e) => {
    try{
      let res = await fetch('http://127.0.0.1:8000/api/v1/auth/restaurant/get-restaurants',{
        method:'GET',
        headers:{
          'Content-Type' : 'application/json'}
      })
      const data = await res.json();
      if(res.status === 200) {
        setRestaurants(data.restaurants)
        setFilter(data.restaurants)
      }
    }catch(error){
      console.error(error)
    }
  }

  useEffect ( () => {
    handleRestaurants();
  },[]);

  const deleteRestaurant = async (id) => {
    try{
      let res = await fetch('http://127.0.0.1:8000/api/v1/auth/admin/delete-restaurant',{
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
        alert(`Restaurant with ID : ${id} was Deleted`)
        window.location.reload();
      }
    }catch(error){
      console.error(error)
    }
  }

  const navigation = useNavigate()
  const navigateEditRestaurant = (id) => {
    navigation('/editRestaurantForm',
    {
      state:{
        id:id
      }
    })
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
  const OrderByCapacity = () => {
    filter.sort(function (a, b) {
      forceUpdate()
      return a.capacity - b.capacity
    })
  }

  const filterRestaurants = () => {
    var temp =[];
    setFilter([]);
    restaurants.forEach(restaurant => {
      if(
        restaurant.name.toLowerCase().includes(filter_input.current.value.toLowerCase())
        ){
            if(restaurant in temp){
            }else{
                temp[temp.length] = restaurant;
                setFilter(temp);
            }
        }
    });
  }

  return (
    <div className="manage-restaurant-container">
      <AdminTopNavBar />
      <AdminMiddleNavBar />
      <div className="adding-restaurant">
        <Link to='/addRestaurantForm'>
          <button>Add Restaurant</button>
        </Link>
        <div className="search">
            <input ref={filter_input} onInput={filterRestaurants} type="text" className='admin-search' placeholder='  Search  '/>
          </div> 
        <OrderBy byName={OrderByName} byDate={OrderByDate} byCapacity={OrderByCapacity} locate={'rest'}/>
        </div>
      <hr className="manage-restaurant-devider" />
      
      {/* Manage Restaurants Header */}
      <div className="manage-restaurant-header">
        <span>Name</span>
        <span>Trend</span>
        <span>Capacity</span>
        <span>Action</span>      
      </div>
      <hr className="manage-restaurant-devider" />
      {/* _________________________ */}
      
      {filter.map(({id,name,trend,capacity}) => (
        <AdminRestaurantCard 
        key={id}
        name={name}
        trend={trend}
        capacity={capacity}
        onDelete={() => {deleteRestaurant(id)}}
        onEdit= { () => {navigateEditRestaurant(id)}}
        />
        ))}
    </div>
  )
}

export default ManageRestaurant    