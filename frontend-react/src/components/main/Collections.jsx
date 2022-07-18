import React from 'react'
import MiddleNavBar from '../navbar/MiddleNavBar'
import TopNavBar from '../navbar/TopNavBar'
import CollectionCard from './restaurants/CollectionCard'
import { reactLocalStorage } from 'reactjs-localstorage'

const Collections = () => {

  const token_key = reactLocalStorage.get('token_key');

  return (
    <div className="collection-wrapper">
      {token_key !== undefined?
      <TopNavBar status={'logout'}/>
      :
      <TopNavBar status={true}/>}
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