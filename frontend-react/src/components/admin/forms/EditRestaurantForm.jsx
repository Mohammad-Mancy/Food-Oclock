import React from 'react'
import { useLocation } from 'react-router-dom';

const EditRestaurantForm = () => {
  const location = useLocation();
  return (
    <div className="edit-restaurant-container">
      edit restaurant {location.state.id}
    </div>
  )
}

export default EditRestaurantForm