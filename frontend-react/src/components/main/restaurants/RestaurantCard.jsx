import React from 'react'

const RestaurantCard = ({name,image,rate,location_id}) => {
  return (
    <div className="restaurant-card">
        <img src={image} className='restaurant-card-image'/>
        <div className='restaurant-details'>
            <div className='restaurant-topbar'>
                <p>{rate}</p>
                <p>{location_id}</p>
            </div>
            <div className='restaurant-title' >{[name]}</div>
        </div>
    </div>
  )
}

export default RestaurantCard