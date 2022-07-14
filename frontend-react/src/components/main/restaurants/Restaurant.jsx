import React from 'react'
import restaurantImage from '../../../assets/baverage.jpg'
const Restaurant = () => {
  return (
    <div className="restaurant-card">
        <img src={restaurantImage} className='restaurant-card-image'/>
        <div className='restaurant-details'>
            <div className='restaurant-topbar'>
                <p>rate</p>
                <p>location name</p>
            </div>
            <div className='restaurant-title' >Restaurant name</div>
        </div>
    </div>
  )
}

export default Restaurant