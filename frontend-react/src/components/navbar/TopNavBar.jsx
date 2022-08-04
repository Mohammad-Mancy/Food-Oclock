import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom'
import { FaUserAlt } from 'react-icons/fa';
import { reactLocalStorage } from 'reactjs-localstorage';
import Search from '../main/search/Search';

function TopNavBar(props) {
  
  const token_key = reactLocalStorage.get('token_key');
  const user_image = reactLocalStorage.getObject('user').image;
  const user_name = reactLocalStorage.getObject('user').name;
  const navigation = useNavigate()  

  let handleLogout = async (e) => {
    try {
      let res = await fetch('http://127.0.0.1:8000/api/v1/auth/user/logout',{
        method: 'POST',
        headers:{
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token_key}`}
      })
      const data = await res.json();
      if (res.status === 200) {
        reactLocalStorage.clear();
        navigation('/login')
      }
    }catch(error){
      console.error(error)
    }
  }
  return (
    <Navbar bg="light" expand="lg" fixed="top" >
      <Container>
        <Navbar.Brand href="/">Food O'Clock</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/restaurantsList">Restaurants</Nav.Link>
            <Nav.Link href="/collections">Cuisines</Nav.Link>
          </Nav>
          {props.locate === 'col' || props.locate === 'rest' || props.locate === 'restByCol'?
          <div className="search">
            <input ref={props.myRef} onInput={props.onInput} type="text" className='search-input' placeholder='  Search  '/>
          </div> 
          :props.locate === 'restPage'?
          <Search locate={'restPage'}/>
          :
          <></>
          }
          <div className="account-login">
                  {token_key !== undefined?
                    <>
                      <img src={'http://127.0.0.1:8000/app/public/'+user_image} style={{width:'50px',height:'50px',borderRadius:'50%' }}/>
                      <NavDropdown title={user_name} id="basic-nav-dropdown">

                      <NavDropdown.Item href='/editprofile'>Account</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>
                        Logout
                      </NavDropdown.Item>

                      </NavDropdown>
                    </>
                    :
                    <>
                      <NavDropdown title='Register' id="basic-nav-dropdown">
                      <NavDropdown.Item href="/login">
                        Login
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/signup">
                        Signup
                      </NavDropdown.Item>
                      </NavDropdown>
                    </>
              }
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavBar;