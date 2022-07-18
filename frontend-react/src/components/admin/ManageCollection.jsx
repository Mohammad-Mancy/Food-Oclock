import React from 'react'
import AdminMiddleNavBar from '../navbar/AdminMiddleNavBar'
import AdminTopNavBar from '../navbar/AdminTopNavBar'
import AdminCollectionCard from './restaurant/AdminCollectionCard'

const ManageCollection = () => {
  return (
    <div className="manage-collection-container">
      <AdminTopNavBar />
      <AdminMiddleNavBar />
      <div className="adding-collection">
        <span>Adding New Collection :</span>
        <button>Add Collection</button>
      </div>
      <hr className="manage-collection-devider" />
      
      {/* Manage Collection Header */}
      <div className="manage-collection-header">
        <span>Name</span>
        <span>Action</span>      
      </div>
      <hr className="manage-collection-devider" />
      {/* _________________________ */}
        
      <AdminCollectionCard />
      <AdminCollectionCard />
      <AdminCollectionCard />
      <AdminCollectionCard />
      <AdminCollectionCard />
      <AdminCollectionCard />
      <AdminCollectionCard />
    </div>
  )
}

export default ManageCollection