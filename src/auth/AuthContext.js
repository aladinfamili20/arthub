import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  AuthErrorCodes
} from 'firebase/auth';
 import { setDoc,doc, addDoc, collection } from 'firebase/firestore';
import { auth } from '../firebase/config';
 const UserContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [currentuser, setcurrentuser] =useState();
  const [error, seterror]=useState()
  const [user, setUser] = useState({});
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setcurrentuser(user)
       }else console.log('No user available')
    })
  },[]) 
  const signUp = (email, password)=>{
      return createUserWithEmailAndPassword(auth, email, password)
     
   };
   const signIn = (email, password) =>  {
    return signInWithEmailAndPassword(auth, email, password)
   }
  const logout = () => {
      return signOut(auth)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
       setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);  
  const value = {
    currentuser,
    signUp,
    error,
    signIn,
    logout,
    user
  };
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(UserContext);
};