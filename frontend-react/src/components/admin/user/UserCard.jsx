import React from 'react'
import {RiDeleteBin5Line} from 'react-icons/ri'

const UserCard = () => {
  return (
    <>
    <div className="user-card">
        <span>username</span>
        <span>email</span>
        <span>phone number</span>
        <span>
            <button><RiDeleteBin5Line/></button>
        </span>
    </div>
    <hr className="user-card-devider" />
    </>
    
  )
}

export default UserCard