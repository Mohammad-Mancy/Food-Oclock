import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/logo/logofoodoclock.png'

const Signup = () => {
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [password_conformation,setPassword_conformation] = useState();
    const [phone_number,setPhone_number] = useState();
  return (
    <div className="signup-wrapper">
        <img src={logo} className="logo-foodoclock" />
        <h1>Create New Account</h1>
        <form className='signup-form'>
            <label>
                <p>Name</p>
                <input type="text" onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                <p>Email</p>
                <input type="text" onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <label>
                <p>Confirm Password</p>
                <input type="password" onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                <p>Phone Number</p>
                <input type="text" onChange={e => setEmail(e.target.value)}/>
            </label>
            <div className='signup-btn-div'>
                <button type="submit">Register</button>
            </div>
            <hr className='signup-divider'/>
            <div className='signup-have-account'>
            <Link to="/login">Already have an account!</Link>
            </div>
        </form>
        
    </div>
  )
}

export default Signup