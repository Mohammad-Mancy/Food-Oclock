import React,{useEffect,useState,useRef} from 'react'
import MiddleNavBar from '../navbar/MiddleNavBar'
import TopNavBar from '../navbar/TopNavBar'
import CollectionCard from './restaurants/CollectionCard'
import { reactLocalStorage } from 'reactjs-localstorage'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

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

const navigation = useNavigate();
const hundleRestaurantByCollection = ({id,name}) => {
  navigation('/restaurantByCollection',
  {
    state:{
      id:id,
      name:name
    }
  })
}

  return (
    <div className="collection-wrapper">
      {token_key !== undefined?
      <TopNavBar locate={'col'} myRef={filter_input} onInput={() =>{filterCollection()}} status={'logout'}/>
      :
      <TopNavBar locate={'col'}myRef={filter_input} onInput={() =>{filterCollection()}} status={true}/>}
        <div className="collection-content-wrapper">
        <Row xs={1} md={4} className="g-4">
          {filter.map(({id,name,image}) => (
            <Col key={id} >
              <Card>
                <Card.Img style={{'height':'22vh'}} variant="top" src={'http://127.0.0.1:8000/app/public/'+image} onClick = { () => { hundleRestaurantByCollection({id,name}) }  }/>
                <Card.Body>
                  <Card.Title>{name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        </div>
    </div>
  )
}

export default Collections