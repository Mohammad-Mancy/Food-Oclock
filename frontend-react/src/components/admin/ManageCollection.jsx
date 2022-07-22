import React,{useEffect,useState} from 'react'
import AdminMiddleNavBar from '../navbar/AdminMiddleNavBar'
import AdminTopNavBar from '../navbar/AdminTopNavBar'
import AdminCollectionCard from './restaurant/AdminCollectionCard'
import { reactLocalStorage } from 'reactjs-localstorage'

const ManageCollection = () => {
  
  const user_type = reactLocalStorage.getObject('user').type;
  const token_key = reactLocalStorage.get('token_key');
  const [collections,setCollections] = useState([]);

  let handleCollections = async (e) => {
    try{
      let res = await fetch('http://127.0.0.1:8000/api/v1/auth/restaurant/get-collections',{
        method:'GET',
        headers:{
          'Content-Type' : 'application/json'}
      })
      const data = await res.json();
      if(res.status === 200) {
        setCollections(data.collections)
      }
    }catch(error){
      console.error(error)
    }
  }

  useEffect ( () => {
    handleCollections();
  },[]);

  const deleteCollection = async (id) => {
    try{
      let res = await fetch('http://127.0.0.1:8000/api/v1/auth/admin/delete-collection',{
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
        alert(`Collection with ID : ${id} was Deleted`)
        window.location.reload();
      }
    }catch(error){
      console.error(error)
    }
  }
  return (
    <div className="manage-collection-container">
      <AdminTopNavBar />
      <AdminMiddleNavBar />
      <div className="adding-collection">
        <span>Adding New Collection :</span>
        <button>Add Collection</button>
      </div>
      <hr className="manage-collection-devider" />
      
      {/* Manage Collection Header */}
      <div className="manage-collection-header">
        <span>Name</span>
        <span>Action</span>      
      </div>
      <hr className="manage-collection-devider" />
      {/* _________________________ */}
        
      {collections.map(({id,name}) => (
        <AdminCollectionCard 
        key={id}
        name={name}
        onDelete={ () => {deleteCollection(id)}}
        />
        ))}
    </div>
  )
}

export default ManageCollection