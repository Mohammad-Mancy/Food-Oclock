import React, { useState,useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function TrendCarousel({first,second,third}) {
  
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };



  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={'http://127.0.0.1:8000/app/public/'+first.image}
          alt="First slide"
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