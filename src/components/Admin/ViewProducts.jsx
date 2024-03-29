import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import useFetchCollection from '../../customhooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectproducts, store_products } from '../../redux/productSlice'
import { deleteObject, ref } from 'firebase/storage'
import { db, storage } from '../../firebase/config'
import { deleteDoc, doc } from 'firebase/firestore'

const ViewProducts = () => {
        const dispatch=useDispatch()
        const {data,isLoading}=useFetchCollection("products")
        useEffect(()=>{
            dispatch(store_products(data))    
        },[data])
    
        const products=useSelector(selectproducts)

    let handleClick=async(id,image)=>{
        if(window.confirm("are you sure to delete this??")){
            try{
               deleteObject(ref(storage,image))
               deleteDoc(doc(db,"products",id))
              toast.success("product deleted")
            }
            catch(err){toast.error(err.message)}
          }
    }
  return (
        <Container className='mt-5 shadow p-3'>
                <h1>View Products
                <Link to='/admin/addproduct' variant='danger' className='btn btn-danger float-end'>Add Products</Link>
                </h1>
                <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Brand</th><th>Price</th>
                    <th>Stock</th><th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length==0 &&    <tr><td colSpan={8}>No Product Found</td></tr>}
                    {products.map((product,i)=>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.category}</td>
                            <td>{product.name}</td>
                            <td><img src={product.image[0]}  width={50} height={50}/></td>
                            <td>{product.brand}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>
                                <Button as={Link} to={`/admin/editproduct/${product.id}`} variant='success' className='me-2'><FaPenAlt/></Button>
                                <Button variant='danger' className='me-2' onClick={()=>handleClick(product.id,product.image)}><FaTrashAlt/></Button>
                            </td>
                        </tr>
                        )}
                </tbody>
                </Table>
        </Container>
  )
}

export default ViewProducts
