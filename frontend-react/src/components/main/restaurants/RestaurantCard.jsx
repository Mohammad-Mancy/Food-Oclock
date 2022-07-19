import React from 'react'
import { useNavigate } from 'react-router-dom'

const RestaurantCard = ({id,name,image,rate,location_name,description}) => {
    const navigation = useNavigate();
    const hundleRestaurant = (id) => {
        navigation('restaurantPage',
        {state:
            {id:id,
             name:name,
             rate:rate,
             location_name:location_name,
             description:description,
             image:image}
            })
    }

  return (
      <div className="restaurant-card" onDoubleClick = { () => { hundleRestaurant(id) } } >
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