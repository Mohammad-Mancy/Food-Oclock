import React,{useState} from 'react'
import { Link , useNavigate } from 'react-router-dom';
import FormTopNavBar from '../navbar/FormTopNavBar';
import { reactLocalStorage } from 'reactjs-localstorage';

const Signup = () => {

    const navigation = useNavigate()
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [password_confirmation,setPassword_confirmation] = useState();
    const [phone_number,setPhone_number] = useState();

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch('http://127.0.0.1:8000/api/v1/auth/user/register',{
                method: 'POST',
                headers:{'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    name:name,
                    email:email,
                    password:password,
                    password_confirmation:password_confirmation,
                    phone_number:phone_number
                })
            })
            const data = await res.json();
            if (res.status === 201) {
                setName('');
                setEmail('');
                setPassword('');
                setPassword_confirmation('');
                setPhone_number('');
                reactLocalStorage.set('token_key', data.token);
                reactLocalStorage.setObject('user', 
                {'id': data.user.id,
                 'name': data.user.name,
                 'type': data.user.type
                });
                navigation('/')
            }else{
                alert('Somthing went wrong')
            }
        }catch(error){
            console.error(error)
        }
    }

  return (
    <div className="signup-wrapper">
        <FormTopNavBar status={false}/>
        <h1>Create New Account</h1>
        <form 
        className='signup-form'
        onSubmit={handleSubmit}
        >
            <label>
                <p>Name</p>
                <input 
                type="text"
                placeholder='Your Name' 
                onChange={e => setName(e.target.value)}/>
            </label>
            <label>
                <p>Email</p>
                <input 
                type="text"
                placeholder='Your Email' 
                onChange={e => setEmail(e.target.value)}/>
            </label>
            <label>
                <p>Password</p>
                <input 
                type="password" 
                placeholder='Password'
                onChange={e => setPassword(e.target.value)}/>
            </label>
            <label>
                <p>Confirm Password</p>
                <input 
                type="password"
                placeholder='Confirm Password' 
                onChange={e => setPassword_confirmation(e.target.value)}/>
            </label>
            <label>
                <p>Phone Number</p>
                <input 
                type="text" 
                placeholder='Your Phone Number'
                onChange={e => setPhone_number(e.target.value)}/>
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