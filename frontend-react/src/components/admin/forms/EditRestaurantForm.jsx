import React, { useState,useEffect }  from 'react'
import { useLocation,Link } from 'react-router-dom';
import AdminTopNavBar from '../../navbar/AdminTopNavBar';
import { reactLocalStorage } from 'reactjs-localstorage';
import imageIcon from '../../../assets/Images-icon.png'
import Select from 'react-select'
import Map from '../../main/Map'
import Form from 'react-bootstrap/Form';

const EditRestaurantForm = () => {

  const user_type = reactLocalStorage.getObject('user').type;
  const token_key = reactLocalStorage.get('token_key');
  const location = useLocation();
  const [options,setOptions] = useState([]);
  const [name,setName] = useState()
  const [capacity,setCapacity] = useState()
  const [description,setDescription] = useState()
  const [collection,setCollection] = useState()
  const [trend,setTrend] = useState()
  const [imageName,setImageName] = useState("Choose Image")
  const [base64code,setBase64code] = useState('noChange')

  let handleCallCurrentRestaurant = async (e) => {
    try{
      let res = await fetch(`http://127.0.0.1:8000/api/v1/auth/restaurant/get-restaurants/${location.state.id}`,{
        method:'GET',
        headers:{'Content-Type' : 'application/json'}
      })
      const data = await res.json();
      if (res.status === 200 ){
        setName(data.restaurants.name)
        setImageName(data.restaurants.image)
        setCapacity(data.restaurants.capacity)
        setDescription(data.restaurants.description)
        setCollection(data.restaurants.collection)
        setTrend(data.restaurants.trend)
        reactLocalStorage.set('lat-coordinates',data.restaurants.latitude)
        reactLocalStorage.set('lng-coordinates',data.restaurants.longitude)
        reactLocalStorage.set('coordinateLat',data.restaurants.latitude)
        reactLocalStorage.set('coordinateLng',data.restaurants.longitude)
      }
    }catch(error){
      console.error(error)
    }
  }

  let handleCallCollection = async (e) => {
    try{
      let res = await fetch('http://127.0.0.1:8000/api/v1/auth/restaurant/get-collections',{
        method:'GET',
        headers:{'Content-Type' : 'application/json'}
      })
      const data = await res.json();
      if (res.status === 200 ){
        data.collections.map(({id,name})=>{
          setOptions((options) => [...options,{'value':id,'label':name}])
        })
      }
    }catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
    handleCallCurrentRestaurant();
    handleCallCollection();
  }, [])

  const imageChoice = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  }
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    setImageName(file.name)
    reader.onload = () => {
      onLoad(reader.result);
    }
  }
  const onLoad = (fileString) => {
    setBase64code(fileString)
    console.log(base64code)
  }

  const handleSaveRestaurant = async (e) => {
    e.preventDefault()
    try{
      let res = await fetch('http://127.0.0.1:8000/api/v1/auth/admin/update-restaurant',{
        method:'PUT',
        headers:{
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token_key}`
        },
        body: JSON.stringify({
          id:location.state.id,
          name:name,
          image:base64code,
          type:user_type,
          description:description,
          capacity:capacity,
          collection:collection,
          trend:trend,
          longitude:reactLocalStorage.get('coordinateLng'),
          latitude:reactLocalStorage.get('coordinateLat')
        })
      })
      if (res.status === 204 ){
        alert('the restaurant updated successfully')
      }
    }catch(error){
      console.error(error)
    }
  }

  return (
    <div className="edit-restaurant-container">
      <AdminTopNavBar status={'form-col-rest'}/>
      <div className="edit-rest-title">Edit Restaurant with ID: {location.state.id}</div>
      <form 
        className='restaurant-form'
        onSubmit={handleSaveRestaurant}
        >
        <input type="file" onChange={imageChoice} className="input-file-image" id='image-input'/>
        <label htmlFor="image-input" className='image-input-label'>
          <img src={imageIcon} style={{width:'150px',height:'150px'}}/>
          <span>{imageName}</span>
        </label>
        <label>
            <p>Name</p>
            <input type="text" 
            placeholder={name}
            onChange={ (e) => setName(e.target.value)}
            />
        </label>
        <label>
            <p>Description</p>
            <textarea type="text" 
            placeholder={description}
            onChange={ (e) => setDescription(e.target.value)}
            />
        </label>
        <label>
            <p>Capacity</p>
            <input type="text" 
            placeholder={capacity}
            onChange={ (e) => setCapacity(e.target.value)}
            />
        </label>
        <div className='map-wrapper'>
          <span>Location</span>
          <Map latLngg={false}/>
        </div>
        <div>
          <Select options={options} onChange={(e) => setCollection(e.value)}/>  
        </div>
        <Form.Check 
          type="switch"
          id="custom-switch"
          label="Trend this week"
          onChange={ () => {trend === 1 ?setTrend(0):setTrend(1)}}
        />
        {console.log(trend)}
        <div className='edit-restaurant-btn-div'>
            <Link to="/manageRestaurant"><button type="submit" className='cancel-edit-restaurant'>Cancel</button></Link>
            <button type="submit" className='save-edit-restaurant'>Save</button>
        </div>
        </form>
    </div>
  )
}

export default EditRestaurantForm