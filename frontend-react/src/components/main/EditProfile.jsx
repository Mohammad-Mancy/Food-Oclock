import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage'
import TopNavBar from '../navbar/TopNavBar'

const EditProfile = () => {

    const [id,setId] = useState();
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [phone_number,setPhone_number] = useState();
    const [imageName,setImageName] = useState();
    const [base64code,setBase64code] = useState('noChange')
    const token_key = reactLocalStorage.get('token_key');

    let handleCallCurrentUser = async (e) => {
        try {
            let res = await fetch('http://127.0.0.1:8000/api/v1/auth/user/user-profile',{
                method:'GET',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token_key}`
                  },
            })
            const data = await res.json();
            if (res.status === 200){
                setName(data.name)
                setEmail(data.email)
                setPhone_number(data.phone_number)
                setImageName(data.image)
                setId(data.id)
            }
        }catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        handleCallCurrentUser();
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

    let handleSaveEdit = async (e) => {
        e.preventDefault()
        try {
            let res = await fetch('http://127.0.0.1:8000/api/v1/auth/user/update-profile',{
                method:'PUT',
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token_key}`
                },
                body: JSON.stringify({
                    id:id,
                    name:name,
                    email:email,
                    phone_number:phone_number,
                    image:base64code
                })
            })
            const data = await res.json();
            console.log(data)
            if (res.status === 200) {
                reactLocalStorage.remove('user');
                reactLocalStorage.setObject('user', 
                {'id': data.user.id,
                 'name': data.user.name,
                 'type': data.user.type,
                 'image': data.user.image
                });
                alert('Your Account successfully updated')
                window.location.reload(false);

            }
        }catch(error){
            console.error(error)
        }
    }

    if(!imageName||!name||!email||!phone_number)
    return(
        <>Still Loading...</>
    )
  return (
    <>
    <TopNavBar status={'logout'}/>
    <div className="edit-profile-container">
        <h2>Edit Profile</h2>
        <form 
        className='edit-form'
        onSubmit={handleSaveEdit}
        >
        <input type="file" onChange={imageChoice} className="input-file-image" id='image-input'/>
            <label htmlFor="image-input" className='image-input-label'>
                {base64code === 'noChange' ?
                <img src={'http://127.0.0.1:8000/app/public/'+imageName} style={{width:'150px',height:'150px',borderRadius:'50%'}}/>
                :
                <img src={base64code} alt='profile pic' style={{width:'150px',height:'150px',borderRadius:'50%'}}/>
                }
                <span>{imageName}</span>
            </label>
            <label>
                <p>Name</p>
                <input type="text" 
                placeholder={name}
                onChange= { (e) => setName(e.target.value)}
                />
            </label>
            <label>
                <p>Email</p>
                <input type="text"
                placeholder={email}
                onChange= { (e) => setEmail(e.target.value)} 
                />
            </label>
            <label>
                <p>Phone Number</p>
                <input type="text" 
                placeholder={phone_number}
                onChange= { (e) => setPhone_number(e.target.value)} 
                />
            </label>
            <div className='edit-profile-btn-div'>
                <Link to="/"><button type="submit" className='cancel-edit-profile'>Cancel</button></Link>
                <button type="submit" className='save-edit-profile'>Save</button>
            </div>
        </form>
    </div>

    </>
    )
}

export default EditProfile