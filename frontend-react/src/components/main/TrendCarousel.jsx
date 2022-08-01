import React, { useState,useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage'

function TrendCarousel({first,second,third}) {
  
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const navigation = useNavigate();
  const hundleRestaurant = ({id,name,image,rate,capacity,description,cuisine,trend,longitude,latitude}) => {
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
          image:image}
          })
  }


  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={'http://127.0.0.1:8000/app/public/'+first.image}
          alt="First slide"
          onClick={ () => { hundleRestaurant({
            id:first.id,
            name:first.name,
            image:first.image,
            rate:first.rate,
            capacity:first.capacity,
            description:first.description,
            cuisine:first.cuisine,
            trend:first.trend,
            longitude:first.longitude,
            latitude:first.latitude}) }}
        />
        <Carousel.Caption>
          <h3>{first.name}</h3>
          <p>{first.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={'http://127.0.0.1:8000/app/public/'+second.image}
          alt="Second slide"
          onClick={ () => { hundleRestaurant({
            id:second.id,
            name:second.name,
            image:second.image,
            rate:second.rate,
            capacity:second.capacity,
            description:second.description,
            cuisine:second.cuisine,
            trend:second.trend,
            longitude:second.longitude,
            latitude:second.latitude}) }}
        />

        <Carousel.Caption>
          <h3>{second.name}</h3>
          <p>{second.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={'http://127.0.0.1:8000/app/public/'+third.image}
          alt="Third slide"
          onClick={ () => { hundleRestaurant({
            id:third.id,
            name:third.name,
            image:third.image,
            rate:third.rate,
            capacity:third.capacity,
            description:third.description,
            cuisine:third.cuisine,
            trend:third.trend,
            longitude:third.longitude,
            latitude:third.latitude}) }}
        />
        <Carousel.Caption>
          <h3>{third.name}</h3>
          <p>{third.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default TrendCarousel;