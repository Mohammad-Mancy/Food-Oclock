import React,{useState} from 'react'
import logo from '../../assets/logo/logofoodoclock.png'
import { Link } from 'react-router-dom';

const Login = () => {
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    return (
        <div className='login-wrapper'>
            <img src={logo} className="logo-foodoclock" />
            <h1>Login</h1>
            <form className='login-form'>
                <label>
                    <p>Email</p>
                    <input type="text" onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div className='login-btn-div'>
                    <button type="submit">Login</button>
                </div>
                <hr className='login-divider'/>
                <div className='login-new-account'>
                <Link to="/signup" >Create new account!</Link>
                </div>
            </form>
        </div>
    )
}

export default Login