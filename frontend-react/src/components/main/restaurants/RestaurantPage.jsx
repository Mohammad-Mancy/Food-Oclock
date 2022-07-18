import React, {useState} from 'react'
import TopNavBar from '../../navbar/TopNavBar'
import restaurantImage from '../../../assets/baverage.jpg'
import PersonReview from './reviews/PersonReview'
import AddReviewForm from './reviews/AddReviewForm'
import { reactLocalStorage } from 'reactjs-localstorage'

const RestaurantPage = () => {

  const token_key = reactLocalStorage.get('token_key');
  const [openAddReviewForm, setOpenAddReviewForm] = useState(false)

  return (
    <div className="restaurant-page">
      {token_key !== undefined?
      <TopNavBar status={'logout'} locate={'restPage'}/>
      :
      <TopNavBar status={false} locate={'restPage'}/>}
        <div className="section-one">
            <img src={restaurantImage} className="section-one-img" />
            <div className="section-one-details">
                <h2>Restaurant name</h2>
                <p>Location</p>
                <span>
                <p>Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                   Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                   when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                   It has survived not only five centuries, but also the leap into electronic typesetting, 
                   remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                   sheets containing Lorem Ipsum passages, and more recently
                   with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
          <PersonReview/>
          <PersonReview/>
          <PersonReview/>
          <PersonReview/>
        </div>
    </div>
  )
}

export default RestaurantPage