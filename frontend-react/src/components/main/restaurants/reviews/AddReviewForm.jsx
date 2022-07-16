import React from 'react'
import ReactStars from "react-rating-stars-component";

const AddReviewForm = ({closeForm}) => {

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <div className="add-review-container">
        <div className="add-review-title">Tell us your experience</div>
        <div className="add-review-body">
        <div className="review-stars">
          <ReactStars
              count={5}
              onChange={ratingChanged}
              size={48}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
            /> 
        </div>
        <textarea className='review-description-textarea'></textarea>
        </div>
        <div className="add-review-bottom">
            <button
            className='cancel-btn'
            onClick={() => {
                closeForm(false)
            }}
            >Cancel
            </button>
            <button className='add-review-btn'>Add Review</button>
        </div>
    </div>
  )
}

export default AddReviewForm