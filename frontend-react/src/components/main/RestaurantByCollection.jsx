import React,{useEffect,useState,useRef} from 'react'
import TopNavBar from '../navbar/TopNavBar'
import { reactLocalStorage } from 'reactjs-localstorage'
import { useLocation,useNavigate} from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Footer } from './footer/Footer';

const RestaurantByCollection = () => {

    const token_key = reactLocalStorage.get('token_key');
    const [restaurants,setRestaurants] = useState([]);
    const [filter, setFilter] = useState([]);
    const location = useLocation();
    const filter_input = useRef();

    let handleRest = async (e) => {
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
          setFilter(data.restaurants)
        }  
      }catch(error){
        console.error(error)
      }
      
    };
  
    useEffect ( () => {
      handleRest();
    },[]);
  
    console.log(restaurants);

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

const navigation = useNavigate();
const hundleRestaurant = ({id,name,image,rate,capacity,description,cuisine,trend,latitude,longitude,email,phone_number}) => {
  reactLocalStorage.set('lat-coordinates',latitude)
  reactLocalStorage.set('lng-coordinates',longitude)
    navigation('/restaurantPage',
    {state:
        {id:id,
        name:name,
        rate:rate,
        description:description,
        capacity:capacity,
        cuisine:cuisine,
        trend:trend,
        latitude:latitude,
        longitude:longitude,
        email:email,
        phone_number:phone_number,
        image:image}
        })
}

return (
    <div className="restaurantByCollection-wrapper">
        {token_key !== undefined?
      <TopNavBar locate={'restByCol'} myRef={filter_input} onInput={() =>{filter_restaurants()}} status={'logout'}/>
      :
      <TopNavBar locate={'restByCol'} myRef={filter_input} onInput={() =>{filter_restaurants()}} status={true}/>}
            <h1 style={{paddingTop:'11vh',color:'#227093'}}>
              {location.state.name}
            </h1>
            <div className="content-wrapper">
              <Row xs={1} md={2} className="g-4">
              {filter.map(({id,name,image,rate,capacity,description,cuisine,trend,latitude,longitude,email,phone_number}) => (
                  <Col key={id}>
                  <Card className='rest-card'>
                      <Card.Img variant="top" 
                      src={'http://127.0.0.1:8000/app/public/'+image} 
                      style={{width:'100%',height:'45vh',borderRadius:'10px'}} 
                      onClick = { () => { hundleRestaurant({id,name,image,rate,capacity,description,cuisine,trend,latitude,longitude,email,phone_number}) } } 
                      />
                    <Card.Body>
                    <Card.Title className='flex-title'><span>{name}</span><span>Rate : {rate == 0 ?<span>No Rating</span>:rate}</span></Card.Title>
                    <Card.Text>
                        Capacity : {capacity}
                    </Card.Text>
                    <Card.Text>
                        Phone : {phone_number}
                    </Card.Text>
                    </Card.Body>
                  </Card>
                  </Col>
              ))}
              </Row>
      </div>
      <Footer />
    </div>
  )
}

export default RestaurantByCollection