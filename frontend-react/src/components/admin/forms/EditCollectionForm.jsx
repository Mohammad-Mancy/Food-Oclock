import React from 'react'
import { useLocation } from 'react-router-dom';
import AdminTopNavBar from '../../navbar/AdminTopNavBar'

const EditCollectionForm = (id) => {
    const location = useLocation();
  return (
    <div className="edit-collection-form">
        <AdminTopNavBar status={'form-col'}/>
        edit collection {location.state.id}
    </div>
  )
}

export default EditCollectionForm