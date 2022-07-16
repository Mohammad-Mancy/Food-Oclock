import React from 'react'
import AdminMiddleNavBar from '../navbar/AdminMiddleNavBar'
import AdminTopNavBar from '../navbar/AdminTopNavBar'
import AdminReviewCard from './restaurant/AdminReviewCard'

const ManageReview = () => {
  return (
    <div className="manage-review-container">
        <AdminTopNavBar />
        <AdminMiddleNavBar />

        {/* Manage Review Header*/}
        <div className="manage-review-header">
          <span>Username</span>
          <span>Restaurant Name</span>
          <span>Rate</span>
          <span>Description</span>
          <span>Action</span>      
        </div>
        <hr className="manage-restaurant-devider" />
        {/* ___________________ */}
        
        <AdminReviewCard />
        <AdminReviewCard />
        <AdminReviewCard />
        <AdminReviewCard />
        <AdminReviewCard />
        <AdminReviewCard />
        <AdminReviewCard />

    </div>
  )
}

export default ManageReview