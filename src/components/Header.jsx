import React, { useEffect, useState } from 'react'
import {Button, Container,Form,InputGroup,Nav,NavDropdown,Navbar} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {FaArrowAltCircleLeft, FaHome, FaListAlt, FaLock, FaPenAlt, FaSearch, FaShoppingCart} from 'react-icons/fa'
import { ShowOnLogin, ShowOnLogout } from './HiddenLinks';
import { toast } from 'react-toastify';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { loginuser, logoutuser, selectUserName, selectUserRole } from '../redux/authSlice';
import { selectCartItems } from '../redux/cartSlice';
import useFetchCollection from '../customhooks/useFetchCollection';
import { FILTER_BY_SEARCH } from '../redux/filterSlice';

const Header = () => {
  const cartItems=useSelector(selectCartItems)

  const username=useSelector(selectUserName)
  const userrole=useSelector(selectUserRole)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  let handleLogout=()=>{
      signOut(auth).then(() => {
        toast.success("loggedOut successfully")
        navigate('/')
      }).catch((error) => {
          toast.error(error.message)
      });
  }

  useEffect(()=>{
    onAuthStateChanged(auth, async(user) => {
      if (user) {
        const uid = user.uid;
        const docRef=doc(db,"users",uid)
        const docSnap=await getDoc(docRef)
        let obj={userEmail:docSnap.data().email,userName:docSnap.data().username,
          userId:uid,userRole:docSnap.data().role}
          dispatch(loginuser(obj))
      } else {
          dispatch(logoutuser())
      } 
    });
  },[auth])


  let [search,setSearch]=useState('')
  let {data:products}=useFetchCollection("products")
  // let handleSearch=()=>{
  //     dispatch(FILTER_BY_SEARCH({products,search}))
  // }
  useEffect(()=>{
    dispatch(FILTER_BY_SEARCH({products,search}))
  },[search])


   return (
    <Navbar bg="dark" data-bs-theme="dark" collapseOnSelect  expand="md">
        <Container fluid>
          <Navbar.Brand href="#home">minipro</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'><FaHome/> Home</Nav.Link>
            {userrole !="admin" &&  <Nav.Link as={Link} to='/products'><FaListAlt/>Products</Nav.Link>}
           {userrole=="admin" &&  
           <NavDropdown title="Category" id="basic-nav-dropdown">
             <NavDropdown.Item as={Link} to='/admin/addcategory'>Add Category</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to='/admin/viewcategories'>View Categories </NavDropdown.Item>
            </NavDropdown>
            
            }
          </Nav>
          <Nav>
            <Form>
              <InputGroup>
                <Form.Control placeholder='search by name or category ' value={search} 
                onChange={(e)=>setSearch(e.target.value)}/>
                {/* <Button variant='danger' onClick={handleSearch}><FaSearch/></Button> */}
              </InputGroup>
            </Form>

            {userrole !='admin' && 
          <Nav.Link as={Link} to='/cart'><FaShoppingCart size={30}/> 
                    <span  class="badge rounded-pill text-bg-danger">
                   {cartItems ? cartItems.length : 0}
                      </span>                    
              </Nav.Link>
            }
            <ShowOnLogout>
                <Nav.Link as={Link} to='/signup'><FaPenAlt/>Register</Nav.Link>
                <Nav.Link as={Link} to='/login'><FaLock/>Login</Nav.Link>
            </ShowOnLogout>
             
              <ShowOnLogin>
                <Nav.Link>Welcome {username}</Nav.Link>
                {userrole =='user' &&  <Nav.Link  as={Link} to='/myorders'>My Orders</Nav.Link> }
                <Nav.Link onClick={handleLogout}><FaArrowAltCircleLeft/>Logout</Nav.Link>
              </ShowOnLogin>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default Header
