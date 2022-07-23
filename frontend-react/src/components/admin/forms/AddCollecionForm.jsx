import React from 'react'
import AdminTopNavBar from '../../navbar/AdminTopNavBar'
import { Link } from 'react-router-dom'
import imageIcon from '../../../assets/Images-icon.png'
import { useState } from 'react'

const AddCollecionForm = () => {

  const [imageName,setImageName] = useState("Choose Image")
  const [name,setName] = useState()
  let base64code = ""
  const imageChoice = (e) => {
    const files = e.target.files;
    const file = files[0];

    getBase64(file);
  };

  const onLoad = (fileString) => {
    base64code = fileString
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

  let handleSaveCollection = (e) => {
    e.preventDefault()
    alert(name)
    //call an API ...
  }

  return (
    <div className="add-collection-container">
        <AdminTopNavBar status={'form-col'}/>
        <div className="add-col-title">Add Collection</div>
        <form 
        className='collection-form'
        onSubmit={handleSaveCollection}
        >
        <input type="file" onChange={imageChoice} className="input-file-image" id='image-input'/>
        <label htmlFor="image-input" className='image-input-label'>
          <img src={imageIcon} style={{width:'150px',height:'150px'}}/>
          <span>{imageName}</span>
        </label>
            <label>
                <p>Name</p>
                <input type="text" 
                placeholder='category name'
                onChange={ (e) => setName(e.target.value)}
                />
            </label>
            <div className='add-collection-btn-div'>
                <Link to="/manageCollection"><button type="submit" className='cancel-add-collection'>Cancel</button></Link>
                <button type="submit" className='save-add-collection'>Save</button>
            </div>
        </form>
    </div>
  )
}

export default AddCollecionForm         