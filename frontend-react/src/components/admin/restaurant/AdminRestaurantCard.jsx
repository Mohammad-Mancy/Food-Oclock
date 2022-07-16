import React from 'react'
import { FaEdit} from 'react-icons/fa'
import {RiDeleteBin5Line} from 'react-icons/ri'

const AdminRestaurantCard = () => {
  return (
    <>
    <div className="admin-restaurant-card">
        <span>Name</span>
        <span>location name</span>
        <span>Capacity</span>
        <span>
            <button className='restaurant-delete-btn'><RiDeleteBin5Line/></button>
            <button className='restaurant-edit-btn'><FaEdit/></button>
        </span>
    </div>
    <hr className="user-card-devider" />
    </>
  )
}

export default AdminRestaurantCard