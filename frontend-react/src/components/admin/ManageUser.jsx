import React from 'react'
import AdminMiddleNavBar from '../navbar/AdminMiddleNavBar'
import AdminTopNavBar from '../navbar/AdminTopNavBar'

const ManageUser = () => {
  return (
    <div className="manage-user">
        <AdminTopNavBar />
        <AdminMiddleNavBar />
        Manage User
    </div>
  )
}

export default ManageUser