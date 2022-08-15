import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import AdminTopNavBar from '../../navbar/AdminTopNavBar'
import imageIcon from '../../../assets/Images-icon.png'
import Select from 'react-select'
import Map from '../../main/Map'
import { reactLocalStorage } from 'reactjs-localstorage'

const AddRestaurantForm = () => {

  const user_type = reactLocalStorage.getObject('user').type;
  const token_key = reactLocalStorage.get('token_key');
  const longitude = reactLocalStorage.get('coordinateLng')
  const latitude = reactLocalStorage.get('coordinateLat')
  const [options,setOptions] = useState([]);
  const [imageName,setImageName] = useState("Choose Image")
  const [description,setDescription] = useState()
  const [name,setName] = useState()
  const [capacity,setCapacity] = useState()
  const [collection,setCollection] = useState()
  const [email,setEmail] = useState()
  const [phone_number,setPhone_number] = useState()
  const [location_name,setLocation_name] = useState()
  const [base64code,setBase64code] = useState('')
  const [addNotification,setAddNotification] = useState(false)
  const navigation = useNavigate()
  
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
  }

  let handleSaveRestaurant = async (e) => {
    e.preventDefault()
    try{
      let res = await fetch('http://127.0.0.1:8000/api/v1/auth/admin/add-restaurant',{
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token_key}`
        },
        body: JSON.stringify({
          name:name,
          image:base64code,
          type:user_type,
          description:description,
          capacity:capacity,
          longitude:longitude,
          latitude:latitude,
          collection_id:collection,
          email:email,
          phone_number:phone_number,
          city:location_name
        })
      })
      const data = await res.json();
      if (res.status === 200) {
        setAddNotification(true)
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
    handleCallCollection();
  }, [])
  

  return (
    <div className="add-restaurant-container">
      <AdminTopNavBar status={'form-col-rest'}/>
      <div className="add-rest-title">Add Restaurant</div>
      <form 
        className='restaurant-form'
        onSubmit={(e) => {
          handleSaveRestaurant(e)
          setTimeout(() => {
            setAddNotification(false)
            navigation('/manageRestaurant')
          }, 2000)
        }}
        >
        <input type="file" onChange={imageChoice} className="input-file-image" id='image-input'/>
        <label htmlFor="image-input" className='image-input-label'>
        {base64code === '' ?
          <img src={imageIcon} style={{width:'250px',height:'250px'}}/>
        :
          <img src={base64code} style={{width:'500px',height:'350px'}}/>
        }
          <span>{imageName}</span>
        </label>
        <label>
            <p>Name</p>
            <input type="text" 
            placeholder='category name'
            onChange={ (e) => setName(e.target.value)}
            />
        </label>
        <label>
            <p>Description</p>
            <textarea type="text" 
            placeholder='description'
            onChange={ (e) => setDescription(e.target.value)}
            />
        </label>
        <label>
            <p>Capacity</p>
            <input type="text" 
            placeholder='capacity'
            onChange={ (e) => setCapacity(e.target.value)}
            />
        </label>
        <label>
            <p>Email</p>
            <input type="text" 
            placeholder='to receive reservation'
            onChange={ (e) => setEmail(e.target.value)}
            />
        </label>
        <label>
            <p>Phone number</p>
            <input type="text" 
            placeholder='Phone Number'
            onChange={ (e) => setPhone_number(e.target.value)}
            />
        </label>
        <label>
            <p>City</p>
            <input type="text" 
            placeholder='City name'
            onChange={ (e) => setLocation_name(e.target.value)}
            />
        </label>
        <div className='map-wrapper'>
          <span>Location</span>
          <Map latLngg={true}/>
        </div>
        <div style={{width:'500px',marginBottom:'20px',marginTop:'20px'}}>
          <p style={{textAlign:'start'}}>Cuisine</p>
          <Select 
          options={options} 
          onChange={(e) => setCollection(e.value)}/>  
        </div>
        {addNotification &&
            <div><h5 style={{color:'green'}}>The Restaurant Added successfully</h5></div>}
        <div className='add-restaurant-btn-div'>
            <Link to="/manageRestaurant"><button type="submit" className='cancel-add-restaurant'>Cancel</button></Link>
            <button type="submit" className='save-add-restaurant'>Save</button>
        </div>
        </form>
    </div>
  )
}

export default AddRestaurantForm