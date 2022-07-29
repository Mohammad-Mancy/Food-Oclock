import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

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
            // setCategory(data.collections)
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
    const hundleRestaurant = ({id,name,image,rate,capacity,description,cuisine,trend}) => {
        navigation('/restaurantPage',
        {state:
            {id:id,
            name:name,
            rate:rate,
            description:description,
            capacity:capacity,
            cuisine:cuisine,
            trend:trend,
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
      {rest.map(({id,name,image,rate,capacity,description,cuisine,trend}) => (
        <Col key={id}>
          <Card className='rest-card'>
            <Card.Img variant="top" 
            src={'http://127.0.0.1:8000/app/public/'+image} 
            style={{width:'100%',height:'40vh'}} 
            onClick = { () => { hundleRestaurant({id,name,image,rate,capacity,description,cuisine,trend}) } } 
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
  );
}

export default Restaurants;