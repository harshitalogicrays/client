import React, { useEffect, useState } from 'react'
import CheckoutSummary from './CheckoutSummary'
import {
    CitySelect,
    CountrySelect,
    StateSelect,
  } from "@davzon/react-country-state-city";
  import "@davzon/react-country-state-city/dist/react-country-state-city.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectShippingAddress, store_shippingaddress } from '../redux/checkoutSlice';
const CheckoutDetails = () => {
    let [shippingAddress,setShippingAddress]=useState({name:'',phone:'',pincode:'',address:'',country:'',state:'',city:''})
    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);
    const navigate=useNavigate()
    const dispatch=useDispatch() 

    let handleSubmit=(e)=>{
        e.preventDefault()
        // alert(JSON.stringify(shippingAddress))
        dispatch(store_shippingaddress(shippingAddress))
        navigate('/checkout')
    }

    const shipping=useSelector(selectShippingAddress)
    useEffect(()=>{
      setShippingAddress(shipping)
    },[])

  return (
    <div className='container mt-5'>
        <div className="row shadow">
            <div className="col-6">
            <h1>Checkout Details</h1><hr/>
            <form onSubmit={handleSubmit}>
            <div className="row">
             
                    <div class="mb-3 col-6">
                        <label for="" class="form-label">Name</label>
                        <input type="text" name="name" class="form-control" value={shippingAddress.name} onChange={(e)=>setShippingAddress({...shippingAddress,name:e.target.value})}/>
                     </div>                   
                     <div class="mb-3 col-6">
                        <label for="" class="form-label">Phone</label>
                        <input type="number" name="phone" class="form-control"  value={shippingAddress.phone} onChange={(e)=>setShippingAddress({...shippingAddress,phone:e.target.value})}/>
                     </div>   
            </div>
            <div className="row">
                    <div class="mb-3 col-6">
                        <label for="" class="form-label">Address</label>
                        <textarea name="address" class="form-control"  value={shippingAddress.address} onChange={(e)=>setShippingAddress({...shippingAddress,address:e.target.value})}>{shippingAddress.address}</textarea>
                     </div>                   
                     <div class="mb-3 col-6">
                        <label for="" class="form-label">pincode</label>
                        <input type="number" name="pincode" class="form-control"   value={shippingAddress.pincode} onChange={(e)=>setShippingAddress({...shippingAddress,pincode:e.target.value})}/>
                     </div>   
            </div>
            <div class="mb-3">
                        <label for="" class="form-label">Country</label>
                        <CountrySelect onChange={(e) => {setCountryid(e.id); setShippingAddress({...shippingAddress,country:e.name}) }} placeHolder="Select Country"/>
                     </div>
            <div className="row">
                    <div class="mb-3 col-6">
                        <label for="" class="form-label">state</label>
                        <StateSelect countryid={countryid} onChange={(e) => {setstateid(e.id);setShippingAddress({...shippingAddress,state:e.name}) }}   
                        placeHolder="Select State" />
                     </div>                   
                     <div class="mb-3 col-6">
                        <label for="" class="form-label">city</label>
                        <CitySelect countryid={countryid} stateid={stateid}  onChange={(e) => {setShippingAddress({...shippingAddress,city:e.name}) }}  placeHolder="Select City"/>
                     </div>   
            </div>
            <button type="submit" class="btn btn-primary"> Proceed to Checkout </button>
            
            </form>
            </div>
            <div className="col-6">
                    <CheckoutSummary/>
            </div>
        </div>
     
    </div>
  )
}

export default CheckoutDetails
