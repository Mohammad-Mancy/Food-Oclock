import React,{useEffect,useState,useReducer,useRef} from 'react'
import AdminMiddleNavBar from '../navbar/AdminMiddleNavBar'
import AdminTopNavBar from '../navbar/AdminTopNavBar'
import AdminCollectionCard from './restaurant/AdminCollectionCard'
import { reactLocalStorage } from 'reactjs-localstorage'
import { Link,useNavigate } from 'react-router-dom'
import OrderBy from './button/OrderBy'

const ManageCollection = () => {
  
  const user_type = reactLocalStorage.getObject('user').type;
  const token_key = reactLocalStorage.get('token_key');
  const [collections,setCollections] = useState([]);
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const [filter, setFilter] = useState([]);
  const filter_input = useRef();
  const [deleteNotification,setDeleteNotification] = useState(false)

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
        setFilter(data.collections)
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
        setDeleteNotification(true)
      }
    }catch(error){
      console.error(error)
    }
  }

  const navigation = useNavigate();
  const navigateEditCollection = (id) => {
    navigation('/editCollectionForm',
    {
      state:{
        id:id
      }
    })
  }

  const OrderByName = () => {
    filter.sort(function (a, b) {
      forceUpdate()
      return a.name.localeCompare(b.name);
    });
  }

  const OrderByDate = () => {
    filter.sort(function (a, b) {
      forceUpdate()
      return a.created_at.localeCompare(b.created_at);
    });
  }

  const filterCollections = () => {
    var temp =[];
    setFilter([]);
    collections.forEach(collection => {
      if(
        collection.name.toLowerCase().includes(filter_input.current.value.toLowerCase())
        ){
            if(collection in temp){
            }else{
                temp[temp.length] = collection;
                setFilter(temp);
            }
        }
    });
  }

  return (
    <div className="manage-collection-container">
      <AdminTopNavBar />
      <AdminMiddleNavBar />
      <div className="adding-collection">
        <Link to='/addCollectionForm'>
          <button>Add Collection</button>
        </Link>
        <div className="search">
             <input ref={filter_input} onInput={filterCollections} type="text" className='admin-search' placeholder='  Search  '/>
          </div> 
        <OrderBy byName={OrderByName} byDate={OrderByDate}/>
      </div>
      <hr className="manage-collection-devider" />
      {deleteNotification &&
        <div><h5 style={{color:'red'}}>Cuisine was deleted</h5></div>}
      
      {/* Manage Collection Header */}
      <div className="manage-collection-header">
        <span>Name</span>
        <span>Action</span>      
      </div>
      <hr className="manage-collection-devider" />
      {/* _________________________ */}
        
      {filter.map(({id,name}) => (
        <AdminCollectionCard 
        key={id}
        name={name}
        onDelete={ () => {
          deleteCollection(id)
          setTimeout(() => {
            setDeleteNotification(false)
            window.location.reload();
          }, 2000)
        }}
        onEdit= { () => {navigateEditCollection(id)}}
        />
        ))}
    </div>
  )
}

export default ManageCollection