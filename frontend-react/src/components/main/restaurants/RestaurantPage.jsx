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
import Button from 'react-bootstrap/esm/Button'
import Pagination from './reviews/Pagination'

const RestaurantPage = () => {

  const token_key = reactLocalStorage.get('token_key');
  const [openAddReviewForm, setOpenAddReviewForm] = useState(false)
  const [reviews, setReviews] = useState();
  const location = useLocation();
  const [rest_rate,setRest_rate] = useState(parseFloat(location.state.rate))
  const [loading,setLoading] = useState(false)
  const [currentPage,setCurrentPage] = useState(1)
  const [reviewPerPage,setReviewPerPage] = useState(3)



  let handleReviews = async (e) => {

    setRest_rate(parseFloat(location.state.rate))
    try{
      setLoading(true)
      let res = await fetch (`http://127.0.0.1:8000/api/v1/auth/restaurant/all-approved-reviews/${location.state.id}`,{
        method: 'GET',
        headers:{
          'Content-Type' : 'application/json'
        }
      })
      const data = await res.json();
      setLoading(false)
      if(res.status === 200) {
        setReviews(data.reviews)
      }
    }catch(error){
      console.error(error)
    }
  }

  useEffect( () => {
    handleReviews();
    setCurrentPage(1)
  }, [location.state.id])

// Get cireent review
  const indexOfLastReview = currentPage * reviewPerPage
  const indexOfFirstReview = indexOfLastReview - reviewPerPage
  if (!reviews){}else{
    var currentReview = reviews.slice(indexOfFirstReview, indexOfLastReview)
  }

  if(!reviews){
    return <h2>Loading ...</h2>
  }

  // change page 
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  
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
          <div style={{display:'flex', gap:'10px'}}>
          <h2>{location.state.name}</h2>
          {location.state.trend === 1 ?
                <Badge bg="warning" text="dark">Trending</Badge>
                :
                <></>
                }
          </div>
          <div style={{fontSize:'1.75rem'}}>Capacity : <Badge bg="info"><span>{location.state.capacity}</span>  Person</Badge></div>
          <div style={{fontSize:'1.75rem'}}>Cuisine : <Badge bg='dark'>{location.state.cuisine}</Badge></div>
          <hr />
          <h3>Reach out :</h3>
          <h4><HiOutlineMail /> {location.state.email}</h4>
          <h4><AiFillPhone/> {location.state.phone_number}</h4>
          <hr />
        </div>
        <div>
            <div className="section-one-details">
                <span className='overview-section'>
                  <h3>About </h3>
                  <h4>{location.state.description}</h4>
                </span>
            </div>
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
          <div className='reviews-title'>Reviews</div>
          <div className='reviews-section'>
          <Pagination paginate={paginate} totalReviews={reviews.length} reviewPerPage={reviewPerPage}/>
          <PersonReview reviews={currentReview} loading={loading}/>
          </div>
          </div>
        <hr className='section-two-devider'/>
        <div className='location-title'>
          Loaction - <span>{location.state.location_name}</span>
          </div>
        <div className='map-rest-page'>
          <Map latLngg={false} display={true}/>
        </div> 
        <Footer />
    </div>
  )
}

export default RestaurantPage