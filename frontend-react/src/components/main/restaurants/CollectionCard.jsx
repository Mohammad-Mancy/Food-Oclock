import React from 'react'
import { useNavigate } from 'react-router-dom'

const CollectionCard = ({id,name,image}) => {

  const navigation = useNavigate();
  const hundleRestaurantByCollection = (id) => {
    navigation('/restaurantByCollection',
    {
      state:{
        id:id,
        name:name
      }
    })
  }

  return (
    <div className="collection-card" onDoubleClick = { () => { hundleRestaurantByCollection(id) } }>
        <img src={'http://127.0.0.1:8000/app/public/'+image}  className='collection-card-image'/>
        <div className="collection-title">
            <div className='collection-name'>{name}</div>
        </div>
    </div>
  )
}

export default CollectionCard