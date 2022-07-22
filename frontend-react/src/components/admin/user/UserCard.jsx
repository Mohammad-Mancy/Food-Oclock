import React from 'react'
import {RiDeleteBin5Line} from 'react-icons/ri'

const UserCard = ({onClick,name,email,phone_number}) => {
  return (
    <>
    <div className="user-card">
        <span>{name}</span>
        <span>{email}</span>
        <span>{phone_number}</span>
        <span>
            <button
            onClick={onClick}
            ><RiDeleteBin5Line/></button>
        </span>
    </div>
    <hr className="user-card-devider" />
    </>
    
  )
}

export default UserCard