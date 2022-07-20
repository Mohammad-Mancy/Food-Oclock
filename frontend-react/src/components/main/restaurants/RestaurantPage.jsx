import React, {useState,useEffect} from 'react'
import TopNavBar from '../../navbar/TopNavBar'
import PersonReview from './reviews/PersonReview'
import AddReviewForm from './reviews/AddReviewForm'
import { reactLocalStorage } from 'reactjs-localstorage'
import { useLocation } from 'react-router-dom'

const RestaurantPage = () => {

  const token_key = reactLocalStorage.get('token_key');
  const [openAddReviewForm, setOpenAddReviewForm] = useState(false)
  const [reviews, setReviews] = useState();
  const location = useLocation();
  
  let handleReviews = async (e) => {
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
  }, [])
  
  console.log(reviews)

  return (
    <div className="restaurant-page">
      {token_key !== undefined?
      <TopNavBar status={'logout'} locate={'restPage'}/>
      :
      <TopNavBar status={false} locate={'restPage'}/>}
        <div className="section-one">
            <img src={'http://127.0.0.1:8000/images/'+location.state.image} className="section-one-img" />
            <div className="section-one-details">
                <h2>{location.state.name}</h2>
                <p>{location.state.location_name}</p>
                <span>
                <p>{location.state.description}
                </p>
                </span>
            </div>
        </div>
        <div className="section-two">
          <div className="review-title">
            <h1>Username</h1>
            <button
            className='add-review-popup' 
            onClick={() => {
              setOpenAddReviewForm(true)
            }}
            >
            Add Review
            </button>
          </div>
          <hr className="section-two-devider" />
          {openAddReviewForm && <AddReviewForm  closeForm={setOpenAddReviewForm} />}
          
          {reviews?
          reviews.map(({id,rate,description,user_name}) => (
            <PersonReview
            key={id}
            rate={rate}
            description={description}
            user_name={user_name}
            />
          ))
          :
         <h1 className='loading'>Loading ....</h1>
        }

        </div>
    </div>
  )
}

export default RestaurantPage