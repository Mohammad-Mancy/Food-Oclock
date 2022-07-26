import React from 'react'
import { FaEdit} from 'react-icons/fa'
import {RiDeleteBin5Line} from 'react-icons/ri'

const AdminRestaurantCard = ({onEdit,onDelete,name,location_name,capacity}) => {
  return (
    <>
    <div className="admin-restaurant-card">
        <span>{name}</span>
        <span>{location_name}</span>
        <span>{capacity}</span>
        <span>
            <button 
            className='restaurant-delete-btn'
            onClick={onDelete}
            ><RiDeleteBin5Line/></button>
            <button 
            className='restaurant-edit-btn'
            onClick={onEdit}
            ><FaEdit/></button>
        </span>
    </div>
    <hr className="user-card-devider" />
    </>
  )
}

export default AdminRestaurantCard