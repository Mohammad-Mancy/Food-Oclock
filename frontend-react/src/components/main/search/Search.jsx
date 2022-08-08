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
            data.restaurants.map(({id,name,description,image,capacity,cuisine,trend,latitude,longitude,rate,email,phone_number,location_name})=>{
              setOptions((options) => [...options,{'value':id,'label':name,'description':description,'image':image,'capacity':capacity,'cuisine':cuisine,'trend':trend,'latitude':latitude,'longitude':longitude,'rate':rate, 'email':email,'phone_number':phone_number,'location_name':location_name}])
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
      const hundleRestaurant = ({id,n,desc,img,cap,cuisine,trend,latitude,longitude,rate,email,phone_number,location_name}) => {
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
                rate:rate,
                email:email,
                phone_number:phone_number,
                location_name:location_name,
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
                    longitude:e.longitude,
                    email:e.email,
                    phone_number:e.phone_number,
                    rate:e.rate,
                    location_name:e.location_name
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
                    longitude:e.longitude,
                    email:e.email,
                    phone_number:e.phone_number,
                    rate:e.rate,
                    location_name:e.location_name
                    }) } }  />
        </div>
    }
    </>

  )
}

export default Search