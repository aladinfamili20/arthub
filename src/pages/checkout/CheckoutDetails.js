import React, { useState } from 'react'
import '../../Styles/CheckoutDetails.css'
import { Link, useNavigate } from 'react-router-dom'
import { CountryDropdown } from 'react-country-region-selector'
import CheckoutSummary from "../../components/checkoutSummary/CheckoutSummary.js";

import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '../../redux/slice/checkoutSlice'
 import { useDispatch } from 'react-redux'
import Card from '../../components/card/Card'
   const initialAddressState = {
  name: "", 
  lastName:"",
  line1: '',
  line2: '',
  city: '',
  state: '',
  zipcode: '',
  country: '',
  phone: '',
}

const CheckoutDeatil = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState
  })
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState
  })

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    // console.log(billingAddress)
    // console.log(shippingAddress)
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
    dispatch(SAVE_BILLING_ADDRESS(billingAddress))
    navigate('/checkout')
  }
  return (
    <div className='checkoutD'>
    <section>
<div className='upContainer'>
<div className='upContent'>
{/* <div className='upImg'>
<img src='https://static.vecteezy.com/system/resources/previews/007/620/390/non_2x/delivery-service-delivery-fast-shipping-concept-illustration-vector.jpg' alt="imagedetail" />
</div> */}
<div className='upInfo'>
<div className='imageInfo'>
<div className='imageInfoView'>    
<form className='shippingCon'>
  <div className='shipingContSec1'>
  <h2>Shipping Address</h2>
   <input type="text" id="name" name="name" placeholder='First Name' required className='shippingContInput' value={shippingAddress.name} autoComplete onChange={(e) => handleShipping(e)} ></input>
   
   <input type="text" id="addressLine1" value={shippingAddress.line1} placeholder='Address 1' name="line1" required className='shippingContInput'autoComplete onChange={(e)=> handleShipping(e)}></input>

   <input type="text" id="addressLine2" value={shippingAddress.line2}  placeholder='Address 2' name="line2" required className='shippingContInput'autoComplete onChange={(e)=> handleShipping(e)}></input>

   <input type="text" id="city" name="city" placeholder='City' required className='shippingContInput' value={shippingAddress.city}autoComplete onChange={(e)=> handleShipping(e)}></input>

  </div>
  <div className='shipingContSec2'>  
  <input type="text" id="nameship" name="lastName" placeholder='Last Name' required className='shippingContInput' value={shippingAddress.name}autoComplete onChange={(e) => handleShipping(e)} ></input>
   <input type="text" id="stateadd" placeholder='State' name="state" required className='shippingContInput'  value={shippingAddress.state}   autoComplete onChange={(e) => handleShipping(e)}></input>
   <input type="text" id="zipadd" name="zip" placeholder='Zip code' required className='shippingContInput' value={shippingAddress.postal_code} autoComplete onChange={(e) => handleShipping(e)}></input>
   <CountryDropdown
   autoComplete
   className='shippingContInput'
   valueType="short"
   value={shippingAddress.country}
   onChange={(val) =>
     handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              /> 
  </div>

 </form>
  
{/* Billing Adredd Form */}
<form className='shippingCon'>
    
  <div className='shipingContSec1'>
    <h2>Billing Address</h2>
    <input type="text" id="namebilling" name="firstName" placeholder='First Name'autoComplete={true} required className='shippingContInput' value={shippingAddress.name} onChange={(e) => handleBilling(e)} ></input>

   <input type="text" id="addressline1" value={shippingAddress.line1}autoComplete={true} placeholder='Address 1' name="line1" required className='shippingContInput' onChange={(e)=> handleBilling(e)}></input>

   <input type="text" id="addressline2" value={shippingAddress.line2} autoComplete={true} placeholder='Address 2' name="line2" required className='shippingContInput' onChange={(e)=> handleBilling(e)}></input>

   <input type="text" id="cityshipping" name="city" placeholder='City'autoComplete={true} required className='shippingContInput' value={shippingAddress.city} onChange={(e)=> handleBilling(e)}></input>

  </div>
  <div className='shipingContSec2'>  
  <input type="text" id="name2" name="lastName" placeholder='Last Name'autoComplete={true} required className='shippingContInput' value={shippingAddress.name} onChange={(e) => handleBilling(e)} ></input>
   <input type="text" id="state2" placeholder='State' name="state"autoComplete={true} required className='shippingContInput'  value={shippingAddress.state} onChange={(e) => handleBilling(e)}></input>

   <input type="text" id="zip2" name="zip" placeholder='Zip code'autoComplete={true} required className='shippingContInput' value={shippingAddress.postal_code} onChange={(e) => handleBilling(e)}></input>

   <CountryDropdown
   autoComplete={true}
   className='shippingContInput'
   valueType="short"
   value={shippingAddress.country}
   onChange={(val) =>
     handleShipping({
                    target: {
                      name: "country",
                      value: val,
                    },
                  })
                }
              />

    

  </div>

 </form>
  <div>
<Card cardClass='card'>
  <CheckoutSummary />
</Card>
</div>
 <button onClick={handleSubmit}>Proceed to Checkout</button>

 </div>  
</div>
 
</div>
</div>
     
</div>
</section>
    </div>
  )
}

export default CheckoutDeatil