import React from 'react'
import MiddleNavBar from '../navbar/MiddleNavBar'
import TopNavBar from '../navbar/TopNavBar'
import RestaurantCard from './restaurants/RestaurantCard'

const Main = () => {
  return (
    <div className="main-wrapper">
        <TopNavBar status={true}/>
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