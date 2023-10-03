import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectUserID, selectUserName } from "../../redux/slice/authSlice";
import Card from "../card/Card";
import styles from "./ReviewProducts.module.scss";
import StarsRating from "react-star-rate";
 import { db, storage } from "../../firebase/config";
import { toast } from "react-toastify";
import useFetchDocument from "../../customHooks/useFetchDocument";
import spinnerImg from "../../assets/spinner.jpg";
import { getAuth,   onAuthStateChanged } from 'firebase/auth'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { Timestamp, addDoc, collection } from "firebase/firestore";
 
 



const ReviewProducts = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("posts", id);
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');

   const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
 
   useEffect(() => {
    setProduct(document);
  }, [document]);    

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };


  const handleUpload = async () => {
    if (!image) return;

    setUploading(true);

    // Create a storage reference
     const storageRef = ref(storage, `reviews/${image.name}`);

    // Upload the image
    try {
      await uploadBytesResumable(storageRef, image);

      // Get the download URL
      const downloadURL = await getDownloadURL(storageRef);
      setImage(downloadURL);
    } catch (error) {
      console.error('Error uploading image:', error);
    }

    setUploading(false);
  };
  const submitReview = (e) => {
    e.preventDefault();
    handleUpload()
    const today = new Date();
    const date = today.toDateString();
    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      image:image,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "reviews"), reviewConfig);
      toast.success("Review submitted successfully");
      setRate(0);
      setReview("");
    } catch (error) {
      // toast.error(error.message);
    }
  };

  return (
    <section>      
      <div className={`container ${styles.review}`}>
      <h2>Review Products</h2>
      {product === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Product name:</b> {product.name}
            </p>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: "100px" }}
            />
          </>
        )}


        <Card cardClass={styles.card}> 
<form 
  // onSubmit={()=> submitReview() }
 >   
 <div className='addPost_container'>       
 
 <input type="file" onChange={handleImageChange} />

 {uploading && <p>Uploading...</p>}
      {imageUrl && (
        <div>
            <img src={imageUrl} alt="Uploaded" width="300" />
        </div>
      )}      
<label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review</label>
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            <p>Press submit twice after 3 seconds</p>
 <button 
 onClick={submitReview}
 className="btn1">
 
     Submit
 
   </button>
 
 </div>
 </form>
 </Card>
       </div>
    
    </section>
    
  );
};

export default ReviewProducts;
