import React from 'react'
import AdminMiddleNavBar from '../navbar/AdminMiddleNavBar'
import AdminTopNavBar from '../navbar/AdminTopNavBar'
import AdminRestaurantCard from './restaurant/AdminRestaurantCard'

const ManageRestaurant = () => {
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
      
      <AdminRestaurantCard/>
      <AdminRestaurantCard/>
      <AdminRestaurantCard/>
      <AdminRestaurantCard/>
      <AdminRestaurantCard/>
    </div>
  )
}

export default ManageRestaurant    