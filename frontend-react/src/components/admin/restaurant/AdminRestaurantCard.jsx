import React from 'react'
import { FaEdit} from 'react-icons/fa'
import {RiDeleteBin5Line} from 'react-icons/ri'
import { MdDone, MdClose } from 'react-icons/md'

const AdminRestaurantCard = ({onEdit,onDelete,name,trend,capacity}) => {
  return (
    <>
    <div className="admin-restaurant-card">
        <span>{name}</span>
        {trend === 1?
        <span style={{color:'green'}}><MdDone/></span>
        :
        <span style={{color:'red'}}><MdClose/></span>
        }
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