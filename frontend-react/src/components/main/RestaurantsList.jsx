import React,{useEffect,useState,useRef} from 'react'
import TopNavBar from '../navbar/TopNavBar'
import { reactLocalStorage } from 'reactjs-localstorage'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

const Restaurants = () => {

  const token_key = reactLocalStorage.get('token_key');
  const [restaurants,setRestaurants] = useState([]);
  const [filter, setFilter] = useState([]);
  const filter_input = useRef();

  let handleRestaurants = async (e) => {
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
    handleRestaurants();
  },[]);

  // _______________ Search __________________________

const filterRestaurants = () => {
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

const navigation = useNavigate();
const hundleRestaurant = ({id,name,image,rate,capacity,description,cuisine}) => {
    navigation('/restaurantPage',
    {state:
        {id:id,
        name:name,
        rate:rate,
        description:description,
        capacity:capacity,
        cuisine:cuisine,
        image:image}
        })
}
  return (
    <div className="collection-wrapper">
      {token_key !== undefined?
      <TopNavBar locate={'rest'} myRef={filter_input} onInput={() =>{filterRestaurants()}} status={'logout'}/>
      :
      <TopNavBar locate={'rest'} myRef={filter_input} onInput={() =>{filterRestaurants()}} status={true}/>}
        <div className="collection-content-wrapper">
        <Row xs={1} md={2} className="g-4">
            {filter.map(({id,name,image,rate,capacity,description,cuisine}) => (
                <Col key={id}>
                <Card className='rest-card'>
                    <Card.Img variant="top" 
                    src={'http://127.0.0.1:8000/app/public/'+image} 
                    style={{width:'100%',height:'45vh',borderRadius:'10px'}} 
                    onClick = { () => { hundleRestaurant({id,name,image,rate,capacity,description,cuisine}) } } 
                    />
                    <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        Rate : {rate == 0 ?<span>New</span>:rate}
                    </Card.Text>
                    <Card.Text>
                        Capacity : {capacity}
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            </Row>
        </div>
    </div>
  )
}

export default Restaurants