import React from 'react'
import profilePic from '../../../../assets/img_avatar.png'
import ReactStars from "react-rating-stars-component";

const PersonReview = ({rate,description,user_name}) => {
  return (
    <div className="section-person-review">
        <div className='section-person-review-title'>
            <div className="profile-details">
                <img src={profilePic} className="profile-pic-review"/>
                <h2>{user_name}</h2>
            </div>
            <span>
              <ReactStars
              count={5}
              value={rate}
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