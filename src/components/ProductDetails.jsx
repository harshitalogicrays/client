import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectproducts } from '../redux/productSlice'
import { ADD_TO_CART, DECREASE, selectCartItems } from '../redux/cartSlice'
import ImageThumbnail from './ImageThumbnail'

const ProductDetails = () => {
    const dispatch=useDispatch()
    const {id}=useParams()
    const allproducts=useSelector(selectproducts)
    const product=allproducts.find(item=>item.id==id)

    // const similarproducts=allproducts.filter(item=>item.category==product.category)

    const cartItems=useSelector(selectCartItems)
    const itemIndex=cartItems.findIndex(item=>item.id==id)
    const item=cartItems.find(item=>item.id==id)
  return (
    <Container className='mt-5 shadow'>
        <h3>Product Details</h3><hr/>
        <Row className=' p-3 m-3'>
            <Col>
                {/* <img src={product.image[0]} className='img-fluid' width={350} height={350}/> */}
                <ImageThumbnail imgs={product.image}/>
            </Col>
            <Col>
                {product.stock > 0 ?
                    <span class="badge rounded-pill text-bg-success float-end">In Stock</span>                
                :
                    <span class="badge rounded-pill text-bg-danger float-end">Out of Stock</span>
                
                }
                <h4>{product.name}</h4><p>{product.brand}</p>
                <p>{product.category}</p>
                <p>price: ${product.price}</p>

                {itemIndex == -1 ? 
                    <Button variant='danger' onClick={()=>dispatch(ADD_TO_CART(product))}>Add to cart</Button>
                    :
                    <>
                    <button type="button" onClick={()=>dispatch(DECREASE(item))}>-</button>
                    <input type="text" readOnly value={item.cartQuantity} style={{width:'40px',textAlign:'center'}}/>
                    <button type="button" onClick={()=>dispatch(ADD_TO_CART(item))}>+</button>
                    </>
            }
                

                
                           

            </Col>
        </Row>
    </Container>
  )
}

export default ProductDetails
