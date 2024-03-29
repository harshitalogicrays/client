import React, { useContext, useEffect } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, CALCULATE_TOTAL, DECREASE, EMPTY_CART, REMOVE_FROM_CART, SAVE_URL, selectCartItems, selectTotalAmount } from '../redux/cartSlice';
import { selectIsLoggedIn } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
   const cartItems=useSelector(selectCartItems)
   const cartTotal=useSelector(selectTotalAmount)
   const isLoggedIn=useSelector(selectIsLoggedIn)
   const dispatch=useDispatch()
   const navigate=useNavigate()
   useEffect(()=>{
     dispatch(CALCULATE_TOTAL())
   },[cartItems])
   
   let url=window.location.href //localhost:3000/cart

   let handleCheckout=()=>{
        if(isLoggedIn){
            navigate('/checkout-details')
        }
        else {
            dispatch(SAVE_URL(url))
            navigate('/login')
        }
   }
  return (
    <Container className='mt-5 shadow p-3'>
        <Table striped bordered hover>
        <thead>
        <tr>
            <th>Sr. No</th>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
            {cartItems.length ==0 &&  <tr><td colSpan={7}>No Item in Cart</td> </tr>}
           {cartItems.map((cart,i)=>
                    <tr key={cart.id}>
                        <td>{i+1}</td>
                        <td>{cart.name}</td>
                        <td><img src={cart.image[0]} height={50} width={50}/></td>
                        <td>{cart.price}</td>
                        <td>
                            <button type="button" onClick={()=>dispatch(DECREASE(cart))}>-</button>
                            <input type="text" readOnly value= {cart.cartQuantity} style={{width:'40px',textAlign:'center'}}/>
                            <button type="button" onClick={()=>dispatch(ADD_TO_CART(cart))}>+</button>
                           </td>
                        <td>{cart.price * cart.cartQuantity}</td>
                        <td>
                            <button type="button" class="btn btn-danger" onClick={()=>dispatch(REMOVE_FROM_CART(cart))}>
                                <FaTrashAlt/>
                            </button>
                            
                        </td>
                    </tr>
        )}
              </tbody>
        </Table>
        <Row>
            <Col xs={9}>
                    <button type="button" class="btn btn-danger btn-lg"  onClick={()=>dispatch(EMPTY_CART())}>
                        Empty Cart
                    </button>
                    
            </Col>
            <Col xs={3}>
                    <h4>Total : <span class="float-end">${cartTotal}</span></h4>
                    <hr/>
                    <div class="d-grid gap-2">
                        <button onClick={handleCheckout}
                            type="button"
                            name=""
                            id=""
                            class="btn btn-warning"
                            disabled={cartItems.length==0 && "disabled"} 
                        >
                            Checkout
                        </button>
                    </div>
                    
            </Col>
        </Row>
  </Container>
);
}

export default Cart
