import React,{useEffect,useState,useRef} from 'react'
import MiddleNavBar from '../navbar/MiddleNavBar'
import TopNavBar from '../navbar/TopNavBar'
import CollectionCard from './restaurants/CollectionCard'
import { reactLocalStorage } from 'reactjs-localstorage'

const Collections = () => {

  const token_key = reactLocalStorage.get('token_key');
  const [collections,setCollections] = useState([]);
  const [filter, setFilter] = useState([]);
  const filter_input = useRef();

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
        setCollections(data.collections)
        setFilter(data.collections)
      }  
    }catch(error){
      console.error(error)
    }
  };

  useEffect ( () => {
    handleCollection();
  },[]);

  // _______________ Search __________________________

const filterCollection = () => {
  var temp =[];
  setFilter([]);
  collections.forEach(collection => {
    if(
      collection.name.toLowerCase().includes(filter_input.current.value.toLowerCase())
      ){
          if(collection in temp){
          }else{
              temp[temp.length] = collection;
              setFilter(temp);
          }
      }
  });
}

// _________________________________________________


  return (
    <div className="collection-wrapper">
      {token_key !== undefined?
      <TopNavBar myRef={filter_input} onInput={() =>{filterCollection()}} status={'logout'}/>
      :
      <TopNavBar myRef={filter_input} onInput={() =>{filterCollection()}} status={true}/>}
        <MiddleNavBar/>
        <div className="collection-content-wrapper">
        {filter.map(({id,name,image})=>(
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