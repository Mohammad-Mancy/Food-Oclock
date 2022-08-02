import React,{useEffect,useState,useReducer,useRef} from 'react'
import AdminMiddleNavBar from '../navbar/AdminMiddleNavBar'
import AdminTopNavBar from '../navbar/AdminTopNavBar'
import AdminReviewCard from './restaurant/AdminReviewCard'
import { reactLocalStorage } from 'reactjs-localstorage'
import OrderBy from './button/OrderBy'

const ManageReview = () => {

  const user_type = reactLocalStorage.getObject('user').type;
  const token_key = reactLocalStorage.get('token_key');
  const [reviews,setReviews] = useState([]);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const filter_input = useRef();
  const [filter, setFilter] = useState([]);

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
        setFilter(data.reviews)
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

  const deleteReview = async (id) => {
    try{
      let res = await fetch('http://127.0.0.1:8000/api/v1/auth/admin/reject-review',{
        method: 'DELETE',
        headers:{
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token_key}`},
        body:JSON.stringify({
          type:user_type,
          id:id
      })
      })
      if(res.status === 204) {
        alert(`Review with ID : ${id} was Rejected`)
        window.location.reload();
      }
    }catch(error){
      console.error(error)
    }
  }
  
  const OrderByName = () => {
    filter.sort(function (a, b) {
      forceUpdate()
      return a.restaurant_name.localeCompare(b.restaurant_name);
    });
  }

  const OrderByDate = () => {
    filter.sort(function (a, b) {
      forceUpdate()
      return a.created_at.localeCompare(b.created_at);
    });
  }

  const OrderByRate = () => {
    filter.sort(function (a, b) {
      forceUpdate()
      return a.rate - b.rate;
    });
  }

  const filterReviews = () => {
    var temp =[];
    setFilter([]);
    reviews.forEach(review => {
      if(
        review.restaurant_name.toLowerCase().includes(filter_input.current.value.toLowerCase())
        ){
            if(review in temp){
            }else{
                temp[temp.length] = review;
                setFilter(temp);
            }
        }
    });
  }

  return (
    <div className="manage-review-container">
        <AdminTopNavBar />
        <AdminMiddleNavBar />

        <div className="manage-reviews-actions">
        <div className="search">
             <input ref={filter_input} onInput={filterReviews} type="text" className='admin-search' placeholder='  Search by Restaurants '/>
          </div> 
        <OrderBy byName={OrderByName} byDate={OrderByDate} byRate={OrderByRate} locate={'reviews'}/>
      </div>

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
        
        {filter.map(({id,user_name,restaurant_name,rate,description}) => (
        <AdminReviewCard 
        key={id}
        user_name={user_name}
        restaurant_name={restaurant_name}
        rate={rate}
        description={description}
        onClick={() => {approveReview(id)}}
        onDelete={() => {deleteReview(id)}}
        />
        ))}


    </div>
  )
}

export default ManageReview