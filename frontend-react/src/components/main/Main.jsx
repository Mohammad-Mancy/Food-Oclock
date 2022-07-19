import React,{useEffect,useState} from 'react'
import MiddleNavBar from '../navbar/MiddleNavBar'
import TopNavBar from '../navbar/TopNavBar'
import RestaurantCard from './restaurants/RestaurantCard'
import { reactLocalStorage } from 'reactjs-localstorage'

const Main = () => {

  const token_key = reactLocalStorage.get('token_key');
  const [restaurants,setRestaurants] = useState([]);
  let handleRestaurant = async (e) => {
    try{
      let res = await fetch('http://127.0.0.1:8000/api/v1/auth/restaurant/get-restaurants',{
        method: 'GET',
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      const data = await res.json();
      if (res.status === 200 ) {
        setRestaurants(data.restaurants)
      }  
    }catch(error){
      console.error(error)
    }
    
  };

  useEffect ( () => {
    handleRestaurant();
  },[]);

  console.log(restaurants);


  return (
    <div className="main-wrapper">
      {token_key !== undefined?
      <TopNavBar status={'logout'}/>
      :
      <TopNavBar status={true}/>}
      <MiddleNavBar/>
      <div className="content-wrapper">
          {restaurants.map(({name,rate,image,location_id})=>(
            <RestaurantCard 
            name={name}
            rate={rate}
            image={image}
            location_id={location_id}
            />
          ))}
      </div>
    </div>
  )
}

export default Main