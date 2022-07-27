import React,{ useState,useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link,useNavigate } from 'react-router-dom';

function Categories() {

    let [category,setCategory] = useState([])

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
            // setCategory(data.collections)
            for(let i= 0;i<=3;i++){
                setCategory(current => [...current, data.collections[i]]);
            }

          }  
        }catch(error){
          console.error(error)
        }
      };
    
      useEffect ( () => {
        handleCollection();
      },[]);

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

  if(category == []){
    return(
        <><div>Still loding...</div></>
    )
  }
  return (
    <Row xs={1} md={4} className="g-4">
      {category.map(({id,name,image}) => (
        <Col key={id} >
          <Card>
            <Card.Img variant="top" src={'http://127.0.0.1:8000/app/public/'+image} onClick = { () => { hundleRestaurantByCollection({id,name}) } }/>
            <Card.Body>
              <Card.Title>{name}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default Categories;