import React, { useEffect } from 'react'
import useFetchCollection from '../customhooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from '../redux/authSlice'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { selectorders, store_orders } from '../redux/orderSlice'

const MyOrders = () => {
    const dispatch=useDispatch()
    const {data}=useFetchCollection("orders")
    useEffect(()=>{
        dispatch(store_orders(data))
    },[data])

    const orders=useSelector(selectorders)
    const userId=useSelector(selectUserId)
    const myorders=orders.filter(order=>order.userId==userId)
  return (
   <Container className='mt-5'>
        <Table className='table table-bordered table-striped'>
            <thead>
                <tr><th>OrderID</th>
                    <th>Order Date and Time</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {myorders.length==0 && <tr><td colSpan={5}>No order found</td></tr>}
                {myorders.map((order)=>
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.orderDate} at {order.orderTime}</td>
                        <td>{order.totalAmount}</td>
                        <td><span className={order.orderStatus != 'Delivered' ? 'text-danger':'text-success'}>{order.orderStatus}</span></td>
                        <td><Link
                            type="button"
                            class="btn btn-primary" to={`/myorders/details/${order.id}`}
                        >
                            View Order Details
                        </Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>

   </Container>
  )
}

export default MyOrders
