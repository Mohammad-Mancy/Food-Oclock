import React from 'react'
import AdminMiddleNavBar from '../navbar/AdminMiddleNavBar'
import AdminTopNavBar from '../navbar/AdminTopNavBar'
import UserCard from './user/UserCard'

const ManageUser = () => {
  return (
    <div className="manage-user">
        <AdminTopNavBar />
        <AdminMiddleNavBar />

        {/* users header */}
          <div className="user-card-header">
          <span>Username</span>
          <span>Email</span>
          <span>Phone number</span>
          <span>Action</span>
          </div>
          <hr className="user-card-devider" />
        {/* _____________ */}

        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
    </div>
  )
}

export default ManageUser