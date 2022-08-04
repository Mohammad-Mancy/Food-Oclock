import React, {useState,useEffect} from 'react'
import TopNavBar from '../../navbar/TopNavBar'
import PersonReview from './reviews/PersonReview'
import AddReviewForm from './reviews/AddReviewForm'
import { reactLocalStorage } from 'reactjs-localstorage'
import { useLocation } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Map from './../Map'
import ReservationCard from './reserve/ReservationCard'
import { Footer } from '../footer/Footer'
import { FaStar } from 'react-icons/fa'
import { AiFillPhone } from 'react-icons/ai'
import { HiOutlineMail } from 'react-icons/hi'
import Badge from 'react-bootstrap/Badge'

const RestaurantPage = () => {

  const token_key = reactLocalStorage.get('token_key');
  const [openAddReviewForm, setOpenAddReviewForm] = useState(false)
  const [reviews, setReviews] = useState();
  const location = useLocation();
  const [rest_rate,setRest_rate] = useState(parseFloat(location.state.rate))
  let handleReviews = async (e) => {
    setRest_rate(parseFloat(location.state.rate))
    try{
      let res = await fetch (`http://127.0.0.1:8000/api/v1/auth/restaurant/all-approved-reviews/${location.state.id}`,{
        method: 'GET',
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      const data = await res.json();
      if(res.status === 200) {
        setReviews(data.reviews)
      }
    }catch(error){
      console.error(error)
    }
  }

  useEffect( () => {
    handleReviews();
  }, [location.state.id])
  
console.log(rest_rate)
  return (
    <div className="restaurant-page">
      {token_key !== undefined?
      <TopNavBar status={'logout'} locate={'restPage'}/>
      :
      <TopNavBar status={false} locate={'restPage'}/>}
        <div className="section-one">
            <img src={'http://127.0.0.1:8000/app/public/'+location.state.image} className="section-one-img" />
            <div className='reserve-form'>
              <ReservationCard 
              rest_id={location.state.id} 
              rest_email={location.state.email}/>
            </div>
        </div>
        <div className='restaurant-details-section'>

          <h2>{location.state.name}</h2>
          {location.state.trend === 1 ?
                <Badge bg="warning" text="dark">Trending</Badge>
                :
                <></>
                }
          <hr />
          <h3>Reach out :</h3>
          <h4><HiOutlineMail /> {location.state.email}</h4>
          <h4><AiFillPhone/> {location.state.phone_number}</h4>
        </div>
        <div className="section-two">
        <div className="review-title">
            <button
            className='add-review-popup' 
            onClick={() => {
              token_key !== undefined?
              setOpenAddReviewForm(true)
              :
              alert('Sorry ! You need to login')
            }}
            >
            Add Review
            </button>
            {rest_rate === 0?
            <div className='rate-rest-page'><span style={{verticalAlign:'text-top'}}>No Rating </span> <span><FaStar style={{color:'gold'}}/></span></div>
            :
            <div className='rate-rest-page'><span style={{verticalAlign:'text-top'}}>{rest_rate} </span> <span><FaStar style={{color:'gold'}}/></span></div>}
          </div>
          <hr className="section-two-devider" />
          {openAddReviewForm && <AddReviewForm restaurant={location.state.id}  closeForm={setOpenAddReviewForm} />}
        <Tabs
          defaultActiveKey="Overview"
          transition={false}
          id="noanim-tab-example"
          className="mb-3">
          <Tab eventKey="Overview" title="Overview">
            <div className="section-one-details">
                <span className='overview-section'>
                  <h2>About</h2>
                  <h3>{location.state.description}</h3>
                </span>
                <span className='overview-section'>
                  <h2>How many people can it fit ?</h2>
                  <h3>{location.state.capacity} person</h3>
                </span>
                <span className='overview-section'>
                  <h2>Under what cuisine is it classified ?</h2>
                  <h3>{location.state.cuisine}</h3>
                </span>
            </div>
          </Tab>
          <Tab eventKey="Reviews" title="Reviews">
              {reviews?
              reviews.map(({id,rate,description,user_name,user_image}) => (
                <PersonReview
                key={id}
                rate={rate}
                description={description}
                user_name={user_name}
                user_image={user_image}
                />
              ))
              :
            <h1 className='loading'>Loading ....</h1>
            }
          </Tab>
        </Tabs>
        </div>
        <div className='location-title'>Loaction</div>
        <div className='map-rest-page'>
          <Map latLngg={false} display={true}/>
        </div> 
        <Footer />
    </div>
  )
}

export default RestaurantPage