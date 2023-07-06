import React, { useEffect, useState } from 'react'
import { getAuth,  GoogleAuthProvider,signInWithPopup } from "firebase/auth";
     const signWithGoogle = ()=>{
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
         const user = result.user       
        //  navigate('/profile') 
      }).catch((error) => {
           const errorCode = error.code;
        });
    }
export default signWithGoogle