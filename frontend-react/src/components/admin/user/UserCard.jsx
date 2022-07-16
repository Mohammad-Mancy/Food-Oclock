import React from 'react'

const UserCard = () => {
  return (
    <>
    <div className="user-card">
        <span>username</span>
        <span>email</span>
        <span>phone number</span>
        <span>
            <button>X</button>
        </span>
    </div>
    <hr className="user-card-devider" />
    </>
    
  )
}

export default UserCard