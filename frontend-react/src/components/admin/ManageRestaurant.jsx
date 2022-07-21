import React,{useState,useEffect} from 'react'
import AdminMiddleNavBar from '../navbar/AdminMiddleNavBar'
import AdminTopNavBar from '../navbar/AdminTopNavBar'
import AdminRestaurantCard from './restaurant/AdminRestaurantCard'
import { reactLocalStorage } from 'reactjs-localstorage'

const ManageRestaurant = () => {

  const user_type = reactLocalStorage.getObject('user').type;
  const token_key = reactLocalStorage.get('token_key');
  const [restaurants,setRestaurants] = useState([]);

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
      }
    }catch(error){
      console.error(error)
    }
  }

  useEffect ( () => {
    handleRestaurants();
  },[]);

  return (
    <div className="manage-restaurant-container">
      <AdminTopNavBar />
      <AdminMiddleNavBar />
      <div className="adding-restaurant">
        <span>Adding New Restuarant :</span>
        <button>Add Restaurant</button>
      </div>
      <hr className="manage-restaurant-devider" />
      
      {/* Manage Restaurants Header */}
      <div className="manage-restaurant-header">
        <span>Name</span>
        <span>location</span>
        <span>Capacity</span>
        <span>Action</span>      
      </div>
      <hr className="manage-restaurant-devider" />
      {/* _________________________ */}
      
      {restaurants.map(({id,name,location_name,capacity}) => (
        <AdminRestaurantCard 
        key={id}
        name={name}
        location_name={location_name}
        capacity={capacity}
        />
        ))}
    </div>
  )
}

export default ManageRestaurant    