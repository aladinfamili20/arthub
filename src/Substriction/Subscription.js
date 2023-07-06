import React  from 'react'
import { FaCheck } from 'react-icons/fa'
import '../Styles/Subscription.css'
//  import DiamondProd from './diamond/DiamondProd'
// import GoldProd from './Gold/GoldProd'
// import PlatinumProd from './Platinum/PlatinumProd'
  const  Subscription =()=>  {
    return (
        <section>
            <div className='subscriptionMainContainer' >
           <div className='top'>
                <h1>Subscription Plans</h1>
           </div>
                <div className='subscriptionInfo'>
                    
                <div className='subscriptionContainer'>
                <div className='subCards' id='silver'>
                    <h1>Diamond </h1>
                    <p>Perfect to ge stated</p>
                    <h2>$397</h2> 
                    <hr></hr>     
                    <div className='PlansDetails'>
                    <div className='PlansDetails'><FaCheck/> Up to Paints</div>   
                    <div className='PlansDetails'><FaCheck/> Free Delivety</div>
                    </div>   
                    <div className='subButton'>
                        <a href='/diamond'>
                            <h1>Subscribe</h1>
                        </a>
                    </div>           
                    </div>

                    <div className='subCards' id='diamond'>
                    <h1>Gold </h1>
                    <p>Popular</p>
                    <h2>$597</h2> 
                    <hr></hr>     
                    <div className='PlansDetails'>
                    <div className='PlansDetails'><FaCheck/> Up to Paints</div>   
                    <div className='PlansDetails'><FaCheck/> Free Delivety</div>
                    </div>   
                    <div className='subButton'>
                        <a href='/gold'>
                            <h1>Subscribe</h1>
                        </a>
                    </div>           
                    </div>

                    <div className='subCards' id='gold'>
                    <h1>Platinum</h1>
                    <p>Ulimited paints</p>
                    <h2>$797</h2> 
                    <hr></hr>     
                    <div className='PlansDetails'>
                    <div className='PlansDetails'><FaCheck/> Home Illusion</div>  
                    <div className='PlansDetails'><FaCheck/> Ulimited paints</div> 
                    <div className='PlansDetails'><FaCheck/> Free Delivety</div>
                    </div>   
                    <div className='subButton'>
                        <a href='/platinum'>
                            <h1>Subscribe</h1>
                        </a>
                    </div>           
                    </div>
                </div>
                </div>
            </div>
            {/* <PlatinumProd/> */}
           {/* <DiamondProd/>
           <GoldProd/> */}
           {/* <PlatinumProd/> */}
          </section>
    )
 }

export default Subscription