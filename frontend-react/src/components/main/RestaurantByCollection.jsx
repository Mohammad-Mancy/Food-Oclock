import React,{useEffect,useState} from 'react'
import TopNavBar from '../navbar/TopNavBar'
import RestaurantCard from './restaurants/RestaurantCard'
import { reactLocalStorage } from 'reactjs-localstorage'
import { useLocation } from 'react-router-dom'

const RestaurantByCollection = () => {

    const token_key = reactLocalStorage.get('token_key');
    const [restaurants,setRestaurants] = useState([]);
    const location = useLocation();

    console.log(location.state)

    let handleRestaurant = async (e) => {
      try{
        let res = await fetch(`http://127.0.0.1:8000/api/v1/auth/restaurant/get-restaurants-by-collection/${location.state.id}`,{
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
    <div className="restaurantByCollection-wrapper">
        {token_key !== undefined?
      <TopNavBar status={'logout'}/>
      :
      <TopNavBar status={true}/>}
      <div className="collection-name-header"><h1>{location.state.name}</h1></div>
            <div className="content-wrapper">
          {restaurants.map(({id,name,rate,image,location_name,description})=>(
            <RestaurantCard 
            key={id}
            id={id}
            name={name}
            rate={rate}
            image={image}
            location_name={location_name}
            description={description}
            />
          ))}
      </div>
    </div>
  )
}

export default RestaurantByCollection