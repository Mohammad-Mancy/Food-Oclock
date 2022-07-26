import React from 'react'
import { useLocation } from 'react-router-dom';
import AdminTopNavBar from '../../navbar/AdminTopNavBar';

const EditRestaurantForm = () => {
  const location = useLocation();
  return (
    <div className="edit-restaurant-container">
      <AdminTopNavBar status={'form-col-rest'}/>
      edit restaurant {location.state.id}
    </div>
  )
}

export default EditRestaurantForm