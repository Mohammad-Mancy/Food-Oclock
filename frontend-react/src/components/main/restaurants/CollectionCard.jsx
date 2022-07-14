import React from 'react'
import CollectionImage from '../../../assets/steakHouse.jpg'
const CollectionCard = () => {
  return (
    <div className="collection-card">
        <img src={CollectionImage} className='collection-card-image'/>
        <div className="collection-title">
            <div className='collection-name'>Collection Name</div>
        </div>
    </div>
  )
}

export default CollectionCard