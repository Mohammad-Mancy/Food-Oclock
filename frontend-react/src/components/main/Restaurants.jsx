import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage';

function Restaurants() {

    let [rest,setRest] = useState([])

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
            for(let i= 0;i<=3;i++){
                setRest(current => [...current, data.restaurants[i]]);
            }

          }  
        }catch(error){
          console.error(error)
        }
      };
    useEffect ( () => {
        handleRestaurants();
      },[]);

      console.log(rest)

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
            email:email,
            phone_number:phone_number,
            image:image}
            })
    }
  
    if(rest == []){
    return(
        <><div>Still loding...</div></>
    )
    }
  return (
    <Row xs={1} md={2} className="g-4">
      {rest.map(({id,name,image,rate,capacity,description,cuisine,trend,latitude,longitude,email,phone_number}) => (
        <Col key={id}>
          <Card className='rest-card'>
            <Card.Img variant="top" 
            src={'http://127.0.0.1:8000/app/public/'+image} 
            style={{width:'100%',height:'40vh'}} 
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
  );
}

export default Restaurants;