import React,{useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../auth/AuthContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
 const ProtectedRoute = ({ children }) => {

  const [users, setUser] = useState({});
  const [loading, setLoading] = useState(true);
   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
       setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // const { user } = UserAuth();

  if (!users) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default ProtectedRoute;