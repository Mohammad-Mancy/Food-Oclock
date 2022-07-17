import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../../assets/img_avatar.png'
import FormTopNavBar from '../navbar/FormTopNavBar'

const EditProfile = () => {
  return (
    <>
    <FormTopNavBar status={'logout'}/>
    <div className="edit-profile-container">
        <h2>Edit Profile</h2>
        <form className='edit-form'>
            <img src={avatar}/>  {/* .... upload using base64 */}
            <label>
                <p>Name</p>
                <input type="text" />
            </label>
            <label>
                <p>Email</p>
                <input type="text" />
            </label>
            <label>
                <p>Phone Number</p>
                <input type="text" />
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