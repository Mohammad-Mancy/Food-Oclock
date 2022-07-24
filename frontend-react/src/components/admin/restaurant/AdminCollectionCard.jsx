import React from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FaEdit } from 'react-icons/fa'

const AdminCollectionCard = ({name,onDelete,onEdit}) => {
  return (
    <>
    <div className="collection-card-container">
        <span>{name}</span>
        <span>
            <button 
            className='collection-delete-btn'
            onClick={onDelete}
            ><RiDeleteBin5Line/></button>
            <button 
            className='collection-edit-btn'
            onClick={onEdit}
            ><FaEdit/></button>
        </span>
    </div>
    <hr className="user-card-devider" />

    </>
    )
}

export default AdminCollectionCard