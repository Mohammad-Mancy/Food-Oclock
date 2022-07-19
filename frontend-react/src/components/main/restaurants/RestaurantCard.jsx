import React from 'react'

const RestaurantCard = ({id,name,image,rate,location_name}) => {
  return (
      <div className="restaurant-card" key={id}>
          <img src={'http://127.0.0.1:8000/images/'+image} className='restaurant-card-image'/>
          <div className='restaurant-details'>
              <div className='restaurant-topbar'>
                  <p>{rate}</p>
                  <p>{location_name}</p>
              </div>
              <div className='restaurant-title' >{[name]}</div>
          </div>
      </div>
  )
}

export default RestaurantCard