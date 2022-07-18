import React from 'react'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FaEdit } from 'react-icons/fa'

const AdminCollectionCard = () => {
  return (
    <>
    <div className="collection-card-container">
        <span>Collection Name</span>
        <span>
            <button className='collection-delete-btn'><RiDeleteBin5Line/></button>
            <button className='collection-edit-btn'><FaEdit/></button>
        </span>
    </div>
    <hr className="user-card-devider" />

    </>
    )
}

export default AdminCollectionCard