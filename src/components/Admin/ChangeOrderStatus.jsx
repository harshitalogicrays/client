import { Timestamp, doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../firebase/config'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser';

const ChangeOrderStatus = ({order,id,orderstatus}) => {
    const navigate=useNavigate()
    let [status,setStatus]=useState(orderstatus)
    let handleUpdate=async(e)=>{
        e.preventDefault()
        try{
            const docRref=doc(db,"orders",id)
            await setDoc(docRref,{
                ...order,
                orderStatus:status,
                createdAt:order.createdAt,
                editedAt:Timestamp.now().toMillis()
            })
            emailjs.send('service_yhfpjt6', 'template_qyp9c3b',{email:order.userEmail,amount:order.totalAmount,order_status:status}, {
                publicKey: 'ouyyULNr1Fl9QYxiJ',
              }).then(() => {
                toast.success("order status updated")
                navigate('/admin/orders')},
                (error) => { toast.error(error.text) },
              );          
        }
        catch(error){
            toast.error(error.message)
        }
    }
  return (
    <div className='col-6'> 
        <h1>Update Order Status</h1><hr/>
        <form onSubmit={handleUpdate}>
            <div class="mb-3">
                <label for="" class="form-label">ORder Status</label>
                <select class="form-select" name="status" value={status}
                onChange={(e)=>setStatus(e.target.value)}>
                    <option>Choose One</option>
                    <option>Order Placed</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary" >
                Update Status
            </button>
            
        </form>
    </div>
  )
}

export default ChangeOrderStatus
