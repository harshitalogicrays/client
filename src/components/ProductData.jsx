import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ADD_TO_CART } from '../redux/cartSlice'

const ProductData = ({product}) => {
  const dispatch=useDispatch()
  return (
    <div className='col-3 mb-3'>
        <div className='card'>
          <Link to={`/product-details/${product.id}`}>
           <img src={product.image[0]}  className='card-img-top' height='200px'/>
           </Link>
           <div className='card-body'>
                <p className='card-text'>
                    {product.name} {product.category}<br/>
                    {product.stock}<br/>
                    ${product.price}
                </p>
                <Button variant='primary' className="me-2" 
                onClick={()=>dispatch(ADD_TO_CART(product))}>
                  Add to cart</Button>
                   </div>
        </div>
    </div>
  )
}

export default ProductData
