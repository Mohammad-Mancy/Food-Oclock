import React,{useState,useEffect} from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage'

const Search = (props) => {
    const [options,setOptions] = useState([]);
    let handleCallRest = async (e) => {
        try{
          let res = await fetch('http://127.0.0.1:8000/api/v1/auth/restaurant/get-restaurants',{
            method:'GET',
            headers:{'Content-Type' : 'application/json'}
          })
          const data = await res.json();
          if (res.status === 200 ){
            data.restaurants.map(({id,name,description,image,capacity,cuisine,trend,latitude,longitude})=>{
              setOptions((options) => [...options,{'value':id,'label':name,'description':description,'image':image,'capacity':capacity,'cuisine':cuisine,'trend':trend,'latitude':latitude,'longitude':longitude}])
            })
          }
        }catch(error){
          console.error(error)
        }
      }
    
      useEffect(() => {
        handleCallRest();
      }, [])

      const navigation = useNavigate();
      const hundleRestaurant = ({id,n,desc,img,cap,cuisine,trend,latitude,longitude}) => {
        reactLocalStorage.set('lat-coordinates',latitude)
        reactLocalStorage.set('lng-coordinates',longitude)
          navigation('/restaurantPage',
          {state:
              {id:id,
                name:n,
                description:desc,
                image:img,
                cuisine:cuisine,
                trend:trend,
                latitude:latitude,
                longitude:longitude,
                capacity:cap}
              })
      }

  return (
    <>
        {props.locate === 'restPage'?
          <div className="search-rest-page">
              <Select 
              options={options} 
              onChange={  
                (e) => { 
                  hundleRestaurant({
                    id:e.value,
                    n:e.label,
                    desc:e.description,
                    img:e.image,
                    cap:e.capacity,
                    cuisine:e.cuisine,
                    trend:e.trend,
                    latitude:e.latitude,
                    longitude:e.longitude
                    }) } }  />
          </div>
      :
        <div className="search-main">
            <Select 
              options={options} 
              onChange={  
                (e) => { 
                  hundleRestaurant({
                    id:e.value,
                    n:e.label,
                    desc:e.description,
                    img:e.image,cap:
                    e.capacity,
                    cuisine:e.cuisine,
                    trend:e.trend,
                    latitude:e.latitude,
                    longitude:e.longitude
                    }) } }  />
        </div>
    }
    </>

  )
}

export default Search