import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { auth, db, storage } from '../firebase/config';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectProducts } from '../redux/slice/productSlice';
import { useAuth } from '../auth/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
const initialState = {
    name: "",
    imageURL: "",
    price: '',
    category: "",
    brand: "",
    desc: "",
    title: '',  
    style: '',
    medium: '',
    location: '',
    color: '',
    orientation: '',
    time: '',
    size: '',
    frame: '',
    material: '',
  };
  const Style = [
    {id: '1', name: 'Abstract'},
    {id: '2', name: 'Architecture'},
    {id: '3', name: 'Figurative'},
    {id: '4', name: 'Nature'},
    {id: '4', name: 'People'},
  ];
  
  const Medium = [
    {id: '1', name: 'Drawing'},
    {id: '2', name: 'Painting'},
    {id: '3', name: 'Sculpture'},
  ];
  
  const Orientation = [
  {id: '1', name: 'Landscape'},
  {id: '2', name: 'Portrait'},
  {id: '3', name: 'Square'},
  ];
  
  const Color = [
  {id: '1', name: 'Red'},
  {id: '2', name: 'Green'},
  {id: '3', name: 'Blue'},
  {id: '4', name: 'Cool Color'},
  {id: '5', name: 'Warm Color'},
  {id: '6', name: 'Black & White'},
  ];
  
  const Location = [
  {id: '1', name: 'Africa'},
  {id: '2', name: 'Asia'},
  {id: '3', name: 'Antarctica'},
  {id: '4', name: 'Australasia'},
  {id: '5', name: 'Europe'},
  {id: '6', name: 'North America '},
  {id: '7', name: 'South America'},
  ]
  
  const Time = [
  {id: '1', name: '2020s'},
  {id: '1', name: '2010s'},
  {id: '1', name: '2000s'},
  {id: '1', name: '1900s'},
  {id: '1', name: '1800s'},
  {id: '1', name: '1700s'},
  {id: '1', name: '1600s'},
  {id: '1', name: '1500s'},
  {id: '1', name: '1400s'},
  {id: '1', name: '1300s'},
  {id: '1', name: '1200s'},
  {id: '1', name: '1100s'},
  {id: '1', name: '1100s'},
  ]
  
  const Frame = [
  {id: '1', name: 'Include'},
  {id: '1', name: 'Not Include'},  
  ]
const UploadArtwork = () => {

    const { id } = useParams();
    const [image, setImage]=useState('')
    const [percent, setPercent] = useState(0);
    const [price, setPrice]=useState('')
    const [size, setSize]=useState('')
    const [desc, setDesc]=useState('')
    const [material, setMaterial] = useState('')
    const [displayName, setDisplayName] = useState(null)
  
    const products = useSelector(selectProducts);
    const productEdit = products.find((item) => item.id === id);
    console.log(productEdit);
    const [product, setProduct] = useState(() => {
      const newState = detectForm(id, { ...initialState }, productEdit);
      return newState;
    });
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  
    // get user's displayName
  
    const {user} = useAuth()
    useEffect(() => {
      onAuthStateChanged(auth, (user)=>{
        if(user){
          const uid = user.uid;
          setDisplayName(user.displayName)
        }
      })
    },[])
  
    function detectForm(id, f1, f2) {
      if (id === "ADD") {
        return f1;
      }
      return f2;
    }
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
    };
    // Image Chanage 
    function handleChange(event) {
      setImage(event.target.files[0]);
      } 
  
    //  Upload image to Firebase
  
    const handleUpload = () => {
      // if (!file) 
    if (!image) 
    {
    alert("Please upload an image first!");}      
    const storageRef = ref(storage, `/files/${image.name}`);      
    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, image);      
    uploadTask.on(
    "state_changed",
    (snapshot) => {
    const percent = Math.round(
    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );      
    // update progress
    setPercent(percent);
    },
    (err) => console.log(err),
    () => {
    // download url
    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    setImage(url);
    console.log(url);
    });
    });
    };
  
    const File = ()=>{
      document.getElementById("fileuplaod").click();
      }
      const binaryData = []
  
      binaryData.push(image)
      const blob = new Blob(binaryData, {type: "image/png"})
      const url = URL.createObjectURL(blob)
      console.log(url)
  
    const addProduct = (e) => {
      e.preventDefault();
      handleUpload();
      // console.log(product);
      setIsLoading(true);
  
      try {
        const docRef = addDoc(collection(db, "posts"), {
          name: product.name,
          image:image,
          price: Number(price),
          category: product.category,
          brand: product.brand,
          desc: desc,
          userID:user.uid,
          style: product.style,
          medium:product.medium,
          location:product.location,
          color: product.color,
          orientation:product.orientation,
          time: product.time,
          size: size,
          displayName:displayName,
          createdAt: Timestamp.now().toDate(),
        });
        setIsLoading(false);
        setUploadProgress(0);
        setProduct({ ...initialState });
  
        toast.success("Product uploaded successfully.");
        navigate("/admin/all-products");
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
    };
  
    const editProduct = (e) => {
      e.preventDefault();
      setIsLoading(true);
  
      if (product.imageURL !== productEdit.imageURL) {
        const storageRef = ref(storage, productEdit.imageURL);
        deleteObject(storageRef);
      }
  
      try {
        setDoc(doc(db, "posts", id), {
          name: product.name,
          imageURL: product.imageURL,
          price: Number(product.price),
          category: product.category,
          brand: product.brand,
          desc: product.desc,
          createdAt: productEdit.createdAt,
          editedAt: Timestamp.now().toDate(),
        });
        setIsLoading(false);
        toast.success("Product Edited Successfully");
        navigate("/admin/all-products");
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
    };

  return (
    <div>

<section>
            <div  className='postContainer'>            
            <div className='addPost'>
            <h1>
              {/* {detectForm(id, 'Add new Artwork', 'Edit Artwork')} */}
              Add new Artwork
              </h1>
               {/* <h2>
              Upload your beautiful Artwork, to be viewed by the world</h2> */}
            </div>
             <form 
            //  onSubmit={detectForm(id, addProduct, editProduct)}
             >

             <input type='file'className='custom-file-upload'  
            // onChange={(e)=>setImage(e.target.value)}
            onChange={handleChange}
             multiple accept='image/png, image/jpg'
            id='fileuplaod'/>
             <div className='addPost_container'>
              {
                image && (
                    <div className='artBox'
              onClick={File}
             >               
            <img src={window.URL.createObjectURL(blob)} alt='signupimg'  />
            {/* <img src={ArtworkImgThumb ? ArtworkImgThumb : image}alt='signupimg'  /> */}
            </div>
                 )
              }
            <div className='artInputs'>
            <form className="addpostForm">
            <input type="text"
              placeholder="Product name"
              required
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            className='title' />
             <div className='AddPostInpCon'>
              <div className='addPostInpCon1'>
                
             {/* Medium */}
             <select
              required name="medium"value={product.medium} onChange={(e) => handleInputChange(e)} className='input'>
              <option value="" disabled>Choose Medium</option>
              {Medium.map((medium) => {
                return (
                  <option key={medium.id} value={medium.name}>
                    {medium.name}
                  </option>
                );
              })}
            </select>        
            <select
              required name="location"value={product.location} onChange={(e) => handleInputChange(e)} className='input'>
              <option value="" disabled>choose Location</option>
              {Location.map((location) => {
                return (
                  <option key={location.id} value={location.name}>
                    {location.name}
                  </option>
                );
              })}
            </select>

             {/* Style */}
                
             <select value={product.style}required
              name="category" onChange={(e) => handleInputChange(e)} className='input'>
              <option value="">Chose Style</option>
               {
                Style.map((Style) => (
                  <option value={Style.name}>{Style.name}</option>
                )
               )}
             </select>
             

             <input type='text' placeholder='Material' value={material} 
            onChange={(e)=>setMaterial(e.target.value)} className='input'/>
              </div>
              <div className='addPostInpCon2'>

              <select
              required name="color"value={product.color} onChange={(e) => handleInputChange(e)} className='input'>
              <option value="" disabled>Choose Color</option>
              {Color.map((color) => {
                return (
                  <option key={color.id} value={color.name}>
                    {color.name}
                  </option>
                );
              })}
            </select>
             <select
              required name="orientation"value={product.orientation} onChange={(e) => handleInputChange(e)} className='input'>
              <option value="" disabled>choose Orientation</option>
              {Orientation.map((orientation) => {
                return (
                  <option key={orientation.id} value={orientation.name}>
                    {orientation.name}
                  </option>
                );
              })}
            </select>
            <select
              required name="time"value={product.time} onChange={(e) => handleInputChange(e)} className='input'>
              <option value="" disabled>Choose Time</option>
              {Time.map((time) => {
                return (
                  <option key={time.id} value={time.name}>
                    {time.name}
                  </option>
                );
              })}
            </select>

            <select
              required name="frame"value={product.frame} onChange={(e) => handleInputChange(e)} className='input'>
              <option value="" disabled>Frame</option>
              {Frame.map((frame) => {
                return (
                  <option key={frame.id} value={frame.name}>
                    {frame.name}
                  </option>
                );
              })}
            </select>
           
              </div>
             </div>
              
            <input type='text' placeholder='Size' value={size} 
            onChange={(e)=>setSize(e.target.value)} className='input'/>
            <input type='number' placeholder='Price' value={price} 
            onChange={(e)=>setPrice(e.target.value)} className='input'/>
            <textarea placeholder="Description"  onChange={(e)=>setDesc(e.target.value)} value={desc} className="desc" >

            </textarea>
            </form>
            <div className='sumbit'
            onClick={addProduct}>              
                <h1>
                  {/* {detectForm(id, 'Submit', 'Edit')}          */}
                  Submit
                </h1>
                <p> {percent} "% done"</p>
              </div>
            </div>
             
             </div>
             </form>
               
            </div>
             
        </section>
    </div>
  )
}

export default UploadArtwork