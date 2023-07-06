import React from 'react'
import '../Styles/Upload.css'
const Upload = () => {
  return (
    <>
     <div className='uploadNaCon'>
     <div className='UploadNav'>      
      <nav>
         <ul  >
           <li><a href='/addArtwork'>Purchased Artwork</a></li>
           <li><a href='/sub'>Subscription Artwork</a></li>
         </ul>
       </nav>
      </div>
     </div>
    </>
  )
}

export default Upload