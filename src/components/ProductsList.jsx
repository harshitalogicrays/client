import React, { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import useFetchCollection from '../customhooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectproducts, store_products } from '../redux/productSlice'
import { selectFilterProducts, selectSearch } from '../redux/filterSlice'
import { Container } from 'react-bootstrap'

const ProductsList = () => {
  const dispatch=useDispatch()
  const {data}=useFetchCollection("products")
  useEffect(()=>{
    dispatch(store_products(data))
  },[data]) 
  
  let products=useSelector(selectproducts)

  let filterProducts=useSelector(selectFilterProducts)
  let searchvalue=useSelector(selectSearch)
  return (
    <>
    {searchvalue == ''  ? <ProductItem products={products}/>
      :
    <>
      {filterProducts.length==0 ? <Container className='mt-5 text-center'><h1>No product Found</h1></Container>
        :
      <ProductItem products={filterProducts}/>
    }
    </>
    }
  
    </>
  )
}

export default ProductsList
