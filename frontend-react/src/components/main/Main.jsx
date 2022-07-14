import React from 'react'
import MiddleNavBar from '../navbar/MiddleNavBar'
import TopNavBar from '../navbar/TopNavBar'
import Restaurant from './restaurants/Restaurant'

const Main = () => {
  return (
    <div className="main-wrapper">
        <TopNavBar/>
        <MiddleNavBar/>
        <div className="content-wrapper">
            <Restaurant />
            <Restaurant />
            <Restaurant />
            <Restaurant />
            <Restaurant />
            <Restaurant />
            <Restaurant />
            <Restaurant />
        </div>
    </div>
  )
}

export default Main