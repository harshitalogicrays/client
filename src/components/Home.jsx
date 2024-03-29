import React from 'react'
import SliderFrontend from './SliderFrontend'
import ProductsList from './ProductsList'
import { Container } from 'react-bootstrap'


const Home = () => {
  return (
   <>
    <SliderFrontend/>
    <Container>
      <hr/>
      <h1>Products</h1>
    <ProductsList/>
    </Container>
   </>
  )
}

export default Home
