import React,{useState} from 'react'
import ReactStars from "react-rating-stars-component";
import { reactLocalStorage } from 'reactjs-localstorage';

const AddReviewForm = ({closeForm,restaurant}) => {
  
  console.log(restaurant)
  const ratingChanged = (newRating) => {
    setNewRating(newRating)
  };

  const token_key = reactLocalStorage.get('token_key');
  const user = reactLocalStorage.getObject('user');
  const rest_id = restaurant;

  const user_id = user.id;
  const [desc,setDesc] = useState();
  const [newRating,setNewRating] = useState();

  let hundleAddReview = async (e) => {
    try{
      let res = await fetch('http://127.0.0.1:8000/api/v1/auth/restaurant/add-review',{
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token_key}`},
        body: JSON.stringify({
          rate:newRating,
          description:desc,
          user_id:user_id,
          restaurant_id:rest_id
        })
      })
      const data = await res.json();
      if (res.status === 200) {
        closeForm(false)
      }
    }catch(error){
      console.log(error)
    }
  }

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
        <textarea className='review-description-textarea'
        onChange={e => setDesc(e.target.value)}
        ></textarea>
        </div>
        <div className="add-review-bottom">
            <button
            className='cancel-btn'
            onClick={() => {
                closeForm(false)
            }}
            >Cancel
            </button>
            <button className='add-review-btn' onClick={() => {hundleAddReview()}}>Add Review</button>
        </div>
    </div>
  )
}

export default AddReviewForm