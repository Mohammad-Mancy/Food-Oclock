import React,{useState,useEffect} from 'react'
import { useLocation,Link } from 'react-router-dom';
import AdminTopNavBar from '../../navbar/AdminTopNavBar'
import imageIcon from '../../../assets/Images-icon.png'
import { reactLocalStorage } from 'reactjs-localstorage';

const EditCollectionForm = () => {
    const location = useLocation();
    const user_type = reactLocalStorage.getObject('user').type;
    const token_key = reactLocalStorage.get('token_key');
    const [name,setName] = useState()
    const [base64code,setBase64code] = useState('noChange')
    const [imageName,setImageName] = useState("Choose Image")

    let handleCallCurrentCollection = async (e) => {
      try{
        let res = await fetch(`http://127.0.0.1:8000/api/v1/auth/restaurant/get-collections/${location.state.id}`,{
          method:'GET',
          headers:{'Content-Type' : 'application/json'}
        })
        const data = await res.json();
        if (res.status === 200 ){
          setName(data.collections.name)
          setImageName(data.collections.image)
        }
      }catch(error){
        console.error(error)
      }
    }
    useEffect(() => {
      handleCallCurrentCollection();
    }, [])
    

    const imageChoice = (e) => {
      const files = e.target.files;
      const file = files[0];
  
      getBase64(file);
    };

    const getBase64 = (file) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      setImageName(file.name)
      reader.onload = () => {
        onLoad(reader.result);
      };
    }

    const onLoad = (fileString) => {
      setBase64code(fileString)
      console.log(base64code)
    };

    let handleSaveEdit = async (e) => {
      e.preventDefault()
      try {
        let res = await fetch('http://127.0.0.1:8000/api/v1/auth/admin/update-collection',{
          method:'PUT',
          headers:{
            'Content-Type' : 'application/json',
            'Authorization': `Bearer ${token_key}`
          },
          body: JSON.stringify({
            id:location.state.id,
            name:name,
            image:base64code,
            type:user_type
          })
        })
        if (res.status === 204) {
            alert('the collection updated successfully')
        }
      }catch(error){
        console.error(error)
      }
    }

  return (
    <div className="edit-collection-form">
        <AdminTopNavBar status={'form-col'}/>
        <div className="edit-col-title">Edit Collection {location.state.id}</div>
        <form 
        className='collection-form'
        onSubmit={handleSaveEdit}
        >
        <input type="file" onChange={imageChoice} className="input-file-image" id='image-input'/>
        <label htmlFor="image-input" className='image-input-label'>
        {base64code === 'noChange' ?
          <img src={'http://127.0.0.1:8000/app/public/'+imageName} style={{width:'400px',height:'300px'}}/>
        :
          <img src={base64code} style={{width:'400px',height:'300px'}}/>
        }
          <span>{imageName}</span>
        </label>
            <label>
                <p>Change collection name :</p>
                <input type="text" 
                placeholder={name}
                onChange={ (e) => setName(e.target.value)}
                />
            </label>
            <div className='edit-collection-btn-div'>
                <Link to="/manageCollection"><button type="submit" className='cancel-edit-collection'>Cancel</button></Link>
                <button type="submit" className='save-edit-collection'>Save</button>
            </div>
        </form>
    </div>
  )
}

export default EditCollectionForm