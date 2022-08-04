import React,{useEffect,useState,useRef} from 'react'
import MiddleNavBar from '../navbar/MiddleNavBar'
import TopNavBar from '../navbar/TopNavBar'
import RestaurantCard from './restaurants/RestaurantCard'
import { reactLocalStorage } from 'reactjs-localstorage'
import TrendCarousel from './TrendCarousel'
import Categories from './Categories'
import {BiCategory,BiRestaurant} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import Restaurants from './Restaurants'
import Search from './search/Search'
import { Footer } from './footer/Footer'

const Main = () => {

  const token_key = reactLocalStorage.get('token_key');
  const [restaurants,setRestaurants] = useState([]);
  var [filter, setFilter] = useState([]);
  const filter_input = useRef();

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
        setFilter(data.restaurants)
      }  
    }catch(error){
      console.error(error)
    }
    
  };

  useEffect ( () => {
    handleRestaurant();
  },[]);


// _______________ Search __________________________

const filter_restaurants = () => {
  var temp =[];
  setFilter([]);
  restaurants.forEach(restaurant => {
    if(
      restaurant.name.toLowerCase().includes(filter_input.current.value.toLowerCase())
      ){
          if(restaurant in temp){
          }else{
              temp[temp.length] = restaurant;
              setFilter(temp);
          }
      }
  });
}

// _________________________________________________
const [first,setFirst] = useState();
const [second,setSecond] = useState();
const [third,setThird] = useState();   

let handleTrendRestaurant = async (e) => {
  try{
    let res = await fetch('http://127.0.0.1:8000/api/v1/auth/restaurant/get-trend-restaurants',{
      method:'GET',
      headers:{'Content-Type' : 'application/json'}
    })
    const data = await res.json();
    if (res.status === 200 ){
        setFirst(data.restaurants[0])
        setSecond(data.restaurants[1])
        setThird(data.restaurants[2])
    }
  }catch(error){
    console.error(error)
  }
}
useEffect(() => {
  handleTrendRestaurant()
},[])


  if (first === undefined && second === undefined && third === undefined) {
    return <> Still loading...</>;
  }
  return (
    <div className="main-wrapper">      
      <div className="top-image-container">
        {token_key !== undefined?

        <TopNavBar myRef={filter_input} onInput={() =>{filter_restaurants()}} status={'logout'}/>
        :
        <TopNavBar myRef={filter_input} onInput={() =>{filter_restaurants()}} status={true}/>}
      </div>
      <Search />
      

      <div className="section-title">
        <span>Trending This Week</span>
      </div>
          <TrendCarousel first={first} second={second} third={third}/>
      <div className="section-title">
        <span>Cuisines</span>
          <Link to='/Collections' style={{fontSize:'1.75rem',textDecoration:'none',alignItems:'center',color:'#000'}}><span>See All  </span><BiCategory style={{verticalAlign: 'text-top'}}/></Link>
      </div>
          <Categories />
      <div className="section-title">
        <span>Restaurants</span>
        <Link to='/restaurantsList' style={{fontSize:'1.75rem',textDecoration:'none',alignItems:'center',color:'#000'}}><span>See All  </span><BiRestaurant style={{verticalAlign: 'text-top'}}/></Link>
      </div>
          <Restaurants />
          <Footer />
    </div>
  )
}

export default Main