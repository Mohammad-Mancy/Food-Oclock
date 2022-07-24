import React,{useState} from 'react'
import { Link , useNavigate } from 'react-router-dom';
import FormTopNavBar from '../navbar/FormTopNavBar';
import { reactLocalStorage } from 'reactjs-localstorage';

const Login = () => {

    const navigation = useNavigate();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch('http://127.0.0.1:8000/api/v1/auth/login', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const data = await res.json();
            if (res.status === 200 ) {
                setEmail('');
                setPassword('');
                reactLocalStorage.set('token_key', data.access_token);
                reactLocalStorage.setObject('user', 
                {'id': data.user.id,
                 'name': data.user.name,
                 'type': data.user.type,
                 'image': data.user.image
                });
                if(data.user.type === 0){
                    navigation('/')
                }else if (data.user.type === 1){
                    navigation('/manageReview')
                }
                
            }else{
                alert('Somthing went wrong')
            }
        }catch(error){
            console.error(error);
        }
    }
    return (
        <div className='login-wrapper'>
            <FormTopNavBar status={true}/>
            <h1>Login</h1>
            <form 
            className='login-form'
            onSubmit={handleSubmit}
            >
                <label>
                    <p>Email</p>
                    <input 
                    type="text"
                    placeholder='Your Email' 
                    onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input 
                    type="password" 
                    placeholder='Your Password'
                    onChange={(e) => setPassword(e.target.value)}/>
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