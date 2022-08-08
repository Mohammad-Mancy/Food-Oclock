import React from 'react'
import ReactStars from "react-rating-stars-component";

const PersonReview = ({reviews,loading}) => {
  if(loading){
    return <h2>Loading...</h2>
  }
  return (
          <div className="section-person-review">
          {reviews.map((review) => {
            return (
                  <div key={review.id}>
                  <div className='section-person-review-title' >
                      <div className="profile-details">
                          <img src={'http://127.0.0.1:8000/app/public/'+review.user_image}  className="profile-pic-review"/>
                          <h2>{review.user_name}</h2>
                      </div>
                      <span>
                        <ReactStars
                        count={5}
                        value={parseFloat(review.rate)}
                        size={36}
                        edit={false}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                        />
                      </span>
                  </div>
                  <div className="description-review">{review.description}</div>
                  <hr className="section-two-devider" />
              </div>
            )
        })}
      </div> 
  )
}

export default PersonReview

