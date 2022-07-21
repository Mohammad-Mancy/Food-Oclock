import React from 'react'
import {RiDeleteBin5Line} from 'react-icons/ri'

const UserCard = ({name,email,phone_number}) => {
  return (
    <>
    <div className="user-card">
        <span>{name}</span>
        <span>{email}</span>
        <span>{phone_number}</span>
        <span>
            <button><RiDeleteBin5Line/></button>
        </span>
    </div>
    <hr className="user-card-devider" />
    </>
    
  )
}

export default UserCard