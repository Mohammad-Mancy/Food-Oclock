import React,{useEffect,useState} from 'react'
import MiddleNavBar from '../navbar/MiddleNavBar'
import TopNavBar from '../navbar/TopNavBar'
import RestaurantCard from './restaurants/RestaurantCard'
import { reactLocalStorage } from 'reactjs-localstorage'

const Main = () => {

  const token_key = reactLocalStorage.get('token_key');
  console.log(token_key)

  return (
    <div className="main-wrapper">
      {token_key !== undefined?
      <TopNavBar status={'logout'}/>
      :
      <TopNavBar status={true}/>}
        <MiddleNavBar/>
        <div className="content-wrapper">
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
        </div>
    </div>
  )
}

export default Main