import React from 'react'

const CollectionCard = ({id,name,image}) => {
  return (
    <div className="collection-card" /*onDoubleClick = { () => { hundleRestaurantByCollection(id) } } */>
        <img src={'http://127.0.0.1:8000/images/collections/'+image}  className='collection-card-image'/>
        <div className="collection-title">
            <div className='collection-name'>{name}</div>
        </div>
    </div>
  )
}

export default CollectionCard