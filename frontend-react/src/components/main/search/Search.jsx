import React,{useState,useEffect} from 'react'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const [options,setOptions] = useState([]);
    let handleCallRest = async (e) => {
        try{
          let res = await fetch('http://127.0.0.1:8000/api/v1/auth/restaurant/get-restaurants',{
            method:'GET',
            headers:{'Content-Type' : 'application/json'}
          })
          const data = await res.json();
          if (res.status === 200 ){
            data.restaurants.map(({id,name,description,image,capacity})=>{
              setOptions((options) => [...options,{'value':id,'label':name,'description':description,'image':image,'capacity':capacity}])
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
      const hundleRestaurant = ({id,n,desc,img,cap}) => {
          navigation('/restaurantPage',
          {state:
              {id:id,
                name:n,
                description:desc,
                image:img,
                capacity:cap}
              })
      }

  return (
    <div className="search-main">
          <Select options={options} onChange={  (e) => { hundleRestaurant({id:e.value,n:e.label,desc:e.description,img:e.image,cap:e.capacity}) } }  />
    </div>
  )
}

export default Search