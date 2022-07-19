import React,{useEffect,useState} from 'react'
import MiddleNavBar from '../navbar/MiddleNavBar'
import TopNavBar from '../navbar/TopNavBar'
import CollectionCard from './restaurants/CollectionCard'
import { reactLocalStorage } from 'reactjs-localstorage'

const Collections = () => {

  const token_key = reactLocalStorage.get('token_key');
  const [collection,setCollection] = useState([]);
  let handleCollection = async (e) => {
    try{
      let res = await fetch('http://127.0.0.1:8000/api/v1/auth/restaurant/get-collections',{
        method: 'GET',
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      const data = await res.json();
      if (res.status === 200 ) {
        setCollection(data.collections)
      }  
    }catch(error){
      console.error(error)
    }
  };

  useEffect ( () => {
    handleCollection();
  },[]);

  return (
    <div className="collection-wrapper">
      {token_key !== undefined?
      <TopNavBar status={'logout'}/>
      :
      <TopNavBar status={true}/>}
        <MiddleNavBar/>
        <div className="collection-content-wrapper">
        {collection.map(({id,name,image})=>(
            <CollectionCard 
            key={id}
            id={id}
            name={name}
            image={image}
            />
          ))}
        </div>
    </div>
  )
}

export default Collections