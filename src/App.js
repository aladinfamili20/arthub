import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Footer from './components/Footer';
import Login from './auth/Login';
import Gallery from './screens/Gallery';
import Artist from './screens/Artist';
import AddPost from './screens/AddPost';
import Subscription from './Substriction/Subscription';

import "react-toastify/dist/ReactToastify.css";
// Pages
import { Home, Contact,  Register, Reset, Admin } from "./pages";
// Components
import {Header } from "./components";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import Cart from "./pages/cart/Cart";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import PrivateRoutes from './Private/PrivateRoutes';
import ReviewProducts from "./components/reviewProducts/ReviewProducts";
import NotFound from "./pages/notFound/NotFound";
import { AuthContextProvider } from "./auth/AuthContext";
import UserNavigation from './components/UserNavigation';
import Navigation from './components/Navigation';

import { useEffect, useState } from "react";
import { auth } from "./firebase/config";
import Profile from "./screens/Profile";
import UploadArtwork from "./screens/UploadArtwork";
import AddProduct from "./components/admin/addProduct/AddProduct";
 import Artwork from "./components/ProfileNav/Artwork";
import AddArtwork from "./components/admin/addProduct/AddArtwork";
import Diamond from "./Substriction/diamond/Diamond";
import DiamondProdDet from "./Substriction/diamond/DiamondProdDet";

import Gold from "./Substriction/Gold/Gold";
 import Sub from "./upload/Sub";
import Upload from "./upload/Upload";
import Platinum from "./Substriction/Platinum/Platinum";
import GoldProdDet from "./Substriction/Gold/GoldProdDet";
import PlatinumProdDet from "./Substriction/Platinum/PlatinumProdDet";
 
function App() {
  const getuser = getAuth()
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
  return (
    <>
      <BrowserRouter>
         <AuthContextProvider>
          {!loading && users?  (<><UserNavigation/></>) : <Navigation />}
         <ToastContainer />
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />

          <Route
            path="/admin/*"
            element={
              <AdminOnlyRoute><Admin /> </AdminOnlyRoute>}/>
          <Route path="/artist" element={<Artist />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-details" element={<CheckoutDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />          
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-details/:id" element={<OrderDetails />} />
          <Route path="/uploadartwork" element={<UploadArtwork />} />
           <Route path="/artworks" element={<Artwork />} />
          <Route path="/review-product/:id" element={<ReviewProducts />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/sub" element={<Sub />} />
          <Route path="/upload" element={<Upload />} />

          <Route path="/addArtwork" element={<AddArtwork />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path='/profile' element={
          <PrivateRoutes><Profile/></PrivateRoutes>}/>
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/diamond" element={<Diamond />} />
            <Route path="/diamondArtwork/:id" element={<DiamondProdDet />} />
            <Route path="/platinumdetail/:id" element={<PlatinumProdDet />} />
            <Route path="/golddetail/:id" element={<GoldProdDet />} />

            <Route path="/gold" element={<Gold />} />
            <Route path="/platinum" element={<Platinum />} />
              <Route path="/addpost" element={<PrivateRoutes><AddPost /></PrivateRoutes>
            } /> 
         </Routes>
 
         </AuthContextProvider>
       <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
