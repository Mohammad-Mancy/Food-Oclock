import React from 'react'
import profilePic from '../../../../assets/img_avatar.png'

const PersonReview = () => {
  return (
    <div className="section-person-review">
        <div className='section-person-review-title'>
            <div className="profile-details">
                <img src={profilePic} className="profile-pic-review"/>
                <h2>name</h2>
            </div>
            <span>rate</span>
        </div>
        <div className="description-review">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
            sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
        <hr className="section-two-devider" />
    </div>
  )
}

export default PersonReview