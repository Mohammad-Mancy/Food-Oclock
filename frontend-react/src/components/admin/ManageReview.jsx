import React,{useEffect,useState} from 'react'
import AdminMiddleNavBar from '../navbar/AdminMiddleNavBar'
import AdminTopNavBar from '../navbar/AdminTopNavBar'
import AdminReviewCard from './restaurant/AdminReviewCard'
import { reactLocalStorage } from 'reactjs-localstorage'

const ManageReview = () => {

  const user_type = reactLocalStorage.getObject('user').type;
  const token_key = reactLocalStorage.get('token_key');
  const [reviews,setReviews] = useState([]);

  let handleReviews = async (e) => {
    try{
      let res = await fetch('http://127.0.0.1:8000/api/v1/auth/admin/all-on-progress-reviews',{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token_key}`},
        body:JSON.stringify({
          type:user_type
      })
      })
      const data = await res.json();
      if(res.status === 200) {
        setReviews(data.reviews)
      }
    }catch(error){
      console.error(error)
    }
  }

  useEffect ( () => {
    handleReviews();
  },[]);

  const approveReview = async (id) => {
    try{
      let res = await fetch('http://127.0.0.1:8000/api/v1/auth/admin/approve-review',{
        method:'PUT',
        headers:{
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token_key}`},
        body:JSON.stringify({
          type:user_type,
          id:id
      })
    })
    const data = await res.json();
    if(res.status === 200) {
      alert(`Review with ID : ${id} was approved`)
      window.location.reload();
    }
    }catch(error){
      console.error(error)
    }
  }
  
  return (
    <div className="manage-review-container">
        <AdminTopNavBar />
        <AdminMiddleNavBar />

        {/* Manage Review Header*/}
        <div className="manage-review-header">
          <span>Username</span>
          <span>Restaurant Name</span>
          <span>Rate</span>
          <span>Description</span>
          <span>Action</span>      
        </div>
        <hr className="manage-restaurant-devider" />
        {/* ___________________ */}
        
        {reviews.map(({id,user_name,restaurant_name,rate,description}) => (
        <AdminReviewCard 
        key={id}
        id={id}
        user_name={user_name}
        restaurant_name={restaurant_name}
        rate={rate}
        description={description}
        onClick={() => {approveReview(id)}}
        />
        ))}


    </div>
  )
}

export default ManageReview