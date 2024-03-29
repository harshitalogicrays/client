import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import {FaUserAlt, FaUserCircle} from 'react-icons/fa'
const Dashboard = () => {
  return (
   <Row>
    <Col xs={2}>
    <ul class="nav nav-pills flex-column mb-auto bg-secondary">
      <li class="nav-item">
        <Link to='/admin' class="nav-link  text-white text-center" aria-current="page">
              Dashboard<br/>
              <FaUserCircle size={30}/>
        </Link>
      </li>
      <hr/>
      <li>
        <Link to='/admin/viewproducts' class="nav-link text-white text-center">
           View Products
        </Link>
      </li>  <hr/>
      <li>
        <Link to='addproduct' class="nav-link text-white text-center">
            Add Product
        </Link>
      </li>  <hr/>
     
      <li>
        <Link to='/admin/viewsliders' class="nav-link text-white text-center">
           View Sliders
        </Link>
      </li>  <hr/>
      <li>
        <Link to='addslider' class="nav-link text-white text-center">
            Add Slider
        </Link>
      </li>  <hr/>
      <li>
        <Link to='orders' class="nav-link text-white text-center">
           Orders
        </Link>
      </li>
    </ul>
    </Col>
    <Col xs={10}>
        <Outlet/>
    </Col>
   </Row>
  )
}

export default Dashboard
