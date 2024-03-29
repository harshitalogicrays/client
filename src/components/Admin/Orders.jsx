import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useFetchCollection from '../../customhooks/useFetchCollection'
import { selectorders, store_orders } from '../../redux/orderSlice'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Orders = () => {
    const dispatch=useDispatch()
    const {data}=useFetchCollection("orders")
    useEffect(()=>{
        dispatch(store_orders(data))
    },[data])

    const orders=useSelector(selectorders)
  return (
    <Container className='mt-5'>
        <h1>All Orders</h1>
        <Table className='table table-bordered table-striped'>
            <thead>
                <tr><th>OrderID</th>
                <th>UserEmail</th>
                    <th>Order Date and Time</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {orders.length==0 && <tr><td colSpan={6}>No order found</td></tr>}
                {orders.map((order)=>
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.userEmail}</td>
                        <td>{order.orderDate} at {order.orderTime}</td>
                        <td>{order.totalAmount}</td>
                        <td><span className={order.orderStatus != 'Delivered' ? 'text-danger':'text-success'}>{order.orderStatus}</span></td>
                        <td><Link
                            type="button"
                            class="btn btn-primary" to={`/admin/orders/details/${order.id}`}
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

export default Orders
