import React from 'react'
import { MdDone, MdClose } from 'react-icons/md'

const AdminReviewCard = () => {
  return (
    <>
    <div className="admin-review-card">
        <span>Username</span>
        <span>Restaurant Name</span>
        <span>Rate</span>
        <span>Description</span>
        <span>
            <button className='review-approve-btn'><MdDone/></button>
            <button className='review-disapprove-btn'><MdClose/></button>
        </span>
    </div>
    <hr className="user-card-devider" />
    </>
  )
}

export default AdminReviewCard