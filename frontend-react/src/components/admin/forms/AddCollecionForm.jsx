import React from 'react'
import AdminTopNavBar from '../../navbar/AdminTopNavBar'
import { Link } from 'react-router-dom'
import imageIcon from '../../../assets/Images-icon.png'
import { useState } from 'react'
import { reactLocalStorage } from 'reactjs-localstorage'
import { useNavigate } from 'react-router-dom'

const AddCollecionForm = () => {

  const user_type = reactLocalStorage.getObject('user').type;
  const token_key = reactLocalStorage.get('token_key');
  const [imageName,setImageName] = useState("Choose Image")
  const [name,setName] = useState()
  const [base64code,setBase64code] = useState('')
  const [addNotification,setAddNotification] = useState(false)
  const navigation = useNavigate()

  const imageChoice = (e) => {
    const files = e.target.files;
    const file = files[0];

    getBase64(file);
  };

  const onLoad = (fileString) => {
    setBase64code(fileString)

    console.log(base64code)
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    setImageName(file.name)
    reader.onload = () => {
      onLoad(reader.result);
    };
  }

  let handleSaveCollection = async (e) => {
    e.preventDefault()
    try{
      let res = await fetch('http://127.0.0.1:8000/api/v1/auth/admin/add-collection',{
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json',
          'Authorization': `Bearer ${token_key}`
        },
        body: JSON.stringify({
          name:name,
          image:base64code,
          type:user_type
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

  return (
    <div className="add-collection-container">
        <AdminTopNavBar status={'form-col'}/>
        <div className="add-col-title">Add Collection</div>
        <form 
        className='collection-form'
        onSubmit={(e) => {
          handleSaveCollection(e)
          setTimeout(() => {
            setAddNotification(false)
            navigation('/manageCollection')
          },2000)
        }}
        >
        <input type="file" onChange={imageChoice} className="input-file-image" id='image-input'/>
        <label htmlFor="image-input" className='image-input-label'>
        {base64code === '' ?
          <img src={imageIcon} style={{width:'150px',height:'150px'}}/>
        :
          <img src={base64code} style={{width:'400px',height:'300px'}}/>
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
            {addNotification &&
            <div><h5 style={{color:'green'}}>The Cuisine Added successfully</h5></div>}
            <div className='add-collection-btn-div'>
                <Link to="/manageCollection"><button type="submit" className='cancel-add-collection'>Cancel</button></Link>
                <button type="submit" className='save-add-collection'>Save</button>
            </div>
        </form>
    </div>
  )
}

export default AddCollecionForm         