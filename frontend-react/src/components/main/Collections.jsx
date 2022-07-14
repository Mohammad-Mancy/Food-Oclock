import React from 'react'
import MiddleNavBar from '../navbar/MiddleNavBar'
import TopNavBar from '../navbar/TopNavBar'
import CollectionCard from './restaurants/CollectionCard'

const Collections = () => {
  return (
    <div className="collection-wrapper">
        <TopNavBar status={true}/>
        <MiddleNavBar/>
        <div className="collection-content-wrapper">
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
          <CollectionCard />
        </div>
    </div>
  )
}

export default Collections