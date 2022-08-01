import React from 'react'
import ReactStars from "react-rating-stars-component";

const PersonReview = ({rate,description,user_name,user_image}) => {
  const ratefloat = parseFloat(rate)
  return (
    <div className="section-person-review">
        <div className='section-person-review-title'>
            <div className="profile-details">
                <img src={'http://127.0.0.1:8000/app/public/'+user_image}  className="profile-pic-review"/>
                <h2>{user_name}</h2>
            </div>
            <span>
              <ReactStars
              count={5}
              value={ratefloat}
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
        <div className="description-review">{description}</div>
        <hr className="section-two-devider" />
    </div>
  )
}

export default PersonReview