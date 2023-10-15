import { addDoc, collection, doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
 import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import styles from "./AddProduct.module.scss";
import { selectProducts } from "../../../redux/slice/productSlice";
import { auth, db, storage } from "../../../firebase/config";
import { CountryDropdown } from "react-country-region-selector";
import { useAuth } from "../../../auth/AuthContext";
import { onAuthStateChanged } from "firebase/auth";

const Style = [
  {id: '1', name: 'Abstract'},
  {id: '2', name: 'Architecture'},
  {id: '3', name: 'Expressionist'},
  {id: '4', name: 'Figurative'},
  {id: '5', name: 'Geometric'},
  {id: '6', name: 'Minimal'},
  {id: '7', name: 'Nature'},
  {id: '8', name: 'People'},
  {id: '9', name: 'Still Life'},
  {id: '10', name: 'Urban'},
];

const Medium = [
  {id: '1', name: 'Drawing'},
  {id: '2', name: 'Mixed Media'},
  {id: '3', name: 'Merchandise'},
  {id: '4', name: 'NFT'},
  {id: '5', name: 'Painting'},
  {id: '6', name: 'Photography'},
  {id: '7', name: 'Prints'},
  {id: '8', name: 'Sculpture'},
];

const Orientation = [
  {id: '1', name: 'Landscape'},
  {id: '2', name: 'Portrait'},
  {id: '3', name: 'Square'},
  ];
  

const Frame = [
{id: '1', name: 'Include'},
{id: '1', name: 'Not Include'},  
]

const Size = [
  {id: '1', name: 'Small'},
  {id: '2', name: 'Medium'},
  {id: '3', name: 'Large'},
  {id: '4', name: 'X-Large'},
]

const Rarity = [
  {id: '1', name: 'Unique'},
  {id: '2', name: 'Limited Edition'},
  {id: '3', name: 'Open Edition'},
  {id: '4', name: 'Unknown Edition'},
]

const initialState = {
  name: "",
  image:  '',
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
  subscription: '',
  rarity:"",
  country:'',
  sign:'',
  year:"",
  specialfeature:"",
  certificate:"",
  artSize:'',
  shipfee: '',
  displayName: "",
  lastName: "",
 };


const AddProduct = () => {
  const { id } = useParams();
  const {user} = useAuth()
  const [displayName, setDisplayName] = useState(null)
   const [percent, setPercent] = useState(0);
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
  const [data, setData] = useState([]);

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }
  

  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if (user){        
         setDisplayName(user.displayName)                 
      }
     })      
  },[])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
// Image Chanage 
// function handleChange(event) {
//   setProduct((event.target.files[0]));
//   } 
const handleImageChange = (e) => {
  const file = e.target.files[0];
  // console.log(file);
  const storageRef = ref(storage, `artwork/${Date.now()}${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    },
    (error) => {
      toast.error(error.message);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setProduct({ ...product, image: downloadURL });
        toast.success("Image uploaded successfully.");
      });
    }
  );
};

  // const File = ()=>{
  //   document.getElementById("fileuplaod").click();
  //   }
    // const binaryData = []
    // binaryData.push(image)
    // const blob = new Blob(binaryData, {type: "image/png"})
    // const url = URL.createObjectURL(blob)

  const addProduct = (e) => {
    e.preventDefault();
    // console.log(product);
    setIsLoading(true);
    // handleImageChange()

    try {
      const docRef = addDoc(collection(db, "posts"), {
        name: product.name,
        image:product.image,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        userID:user.uid,
        style: product.style,
        medium:product.medium,
        location:product.location,
        color: product.color,
        orientation:product.orientation,
        time: product.time,
        size: product.size,
        displayName:displayName,        
        rarity:product.rarity,
        country:product.country,
        sign:product.sign,
        year:product.year,
        certificate:product.certificate,
        specialfeature:product.specialfeature,
        shipfee:Number(product.shipfee),
        artSize:product.artSize,
        frame:product.frame,
        material:product.material,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });

      toast.success("Product uploaded successfully.");
      navigate("/artistprofile");
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.image !== productEdit.image) {
      const storageRef = ref(storage, productEdit.image);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "posts", id), {
        name: product.name,
        image:product.image,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        userID:user.uid,
        style: product.style,
        medium:product.medium,
        location:product.location,
        color: product.color,
        orientation:product.orientation,
        time: product.time,
        size: product.size,
        displayName:displayName,       
        rarity:product.rarity,
        country:product.country,
        sign:product.sign,
        year:product.year,
        certificate:product.certificate,
        specialfeature:product.specialfeature,
        shipfee:Number(product.shipfee),
        artSize:product.artSize,
        frame:product.frame,
        material:product.material,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product Edited Successfully");
      navigate("/artistprofile");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
 
      <div className='postContainer'>
<form 
className="addpostForm"
 onSubmit={detectForm(id, addProduct, editProduct)}
 >

 {/* <input type='file'className='custom-file-upload '  
onChange={(e)=>setImage(e.target.value)}
onChange={handleChange}
 multiple accept='image/png, image/jpg'
id='fileuplaod'/> */}

  
 <div className='addPost_container'>
  {/* {product.image && (<div className='artBox'onClick={File}>               
<img src={window.URL.createObjectURL(blob)} alt='signupimg'  />
{uploadProgress === 0 ? null : (
<div className={styles.progress}>
<div
        className={styles["progress-bar"]}
        style={{ width: `${uploadProgress}%` }}
      >
        {uploadProgress < 100
          ? `Uploading ${uploadProgress}`
          : `Upload Complete ${uploadProgress}%`}
      </div>
    </div>
  )}
<img src={ArtworkImgThumb ? ArtworkImgThumb : image}alt='signupimg'  />
</div>
     )
  } */}
<input
    type="file"
    accept="image/*"
    placeholder="Product Image"
    name="image"
     onChange={(e) => handleImageChange(e)}
     className="image"
  />
  
             {product.image === "" ? null : (
                <input
                  type="text"
                  // required
                  placeholder="Image URL"
                  name="image"
                  value={product.image}
                  disabled
                  style={{display:'none'}}
                />
              )}
     
 

<div className='artInputs'>
  

 
 <div className='AddPostInpCon'>
  <div className='addPostInpCon1'>

            

  <input type="text"
  placeholder=" * Title of the artwork"
  required
  name="name"
  value={product.name}
  onChange={(e) => handleInputChange(e)}
className='input' />
  {/* year */}

<input type="text"
  placeholder=" * Year"
  required
  name="year"
  value={product.year}
  onChange={(e) => handleInputChange(e)}
className='input' />


{/* choose size */}
<select
  required name="size"
  value={product.size}
   onChange={(e) => handleInputChange(e)} className='input'>
  <option value="" disabled> * Choose size</option>
  {Size.map((size) => {
    return (
      <option key={size.id} value={size.name}>
        {size.name}
      </option>
    );
  })}
</select> 

<input type='text' placeholder=' * Size ex: 39 × 31 in | 99.1 × 78.7 cm' 
value={product.artSize} 
name="artSize"
onChange={(e) => handleInputChange(e)} className='input'/>

<input type="text"
  placeholder=" * Material"
  required
  name="material"
  value={product.material}
  onChange={(e) => handleInputChange(e)}
className='input' />

<input type="text"
  placeholder="Special Features"
  required
  name="specialfeature"
  value={product.specialfeature}
  onChange={(e) => handleInputChange(e)}
className='input' />
 {/* Medium */}
 <select
  required name="medium"
  value={product.medium} 
  onChange={(e) => handleInputChange(e)} className='input'>
  <option value="" disabled> * Choose Medium</option>
  {Medium.map((medium) => {
    return (
      <option key={medium.id} value={medium.name}>
        {medium.name}
      </option>
    );
  })}
</select>


{/* choose Rarity */}

<select
  required name="rarity"
  value={product.rarity} 
  onChange={(e) => handleInputChange(e)} className='input'>
  <option value="" disabled> * Choose Rarity</option>
  {Rarity.map((rarity) => {
    return (
      <option key={rarity.id} value={rarity.name}>
        {rarity.name}
      </option>
    );
  })}
</select>  

 

  </div>
  <div className='addPostInpCon2'>
 

  <input type="number"
  placeholder=" * Price ($USD)"
  required
  name="price"
  value={product.price}
  onChange={(e) => handleInputChange(e)}
className='input' />


  <select
  required name="style"
  value={product.style}
   onChange={(e) => handleInputChange(e)} className='input'>
  <option value="" disabled> * choose Style</option>
  {Style.map((Style) => {
    return (
      <option key={Style.id} value={Style.name}>
        {Style.name}
      </option>
    );
  })}
</select>

{/* signature */}

<input type="text"
  placeholder="Signature"
  required
  name="sign"
  value={product.sign}
  onChange={(e) => handleInputChange(e)}
className='input' />
    
 {/* <select
  required name="orientation"
  value={product.orientation}
   onChange={(e) => handleInputChange(e)} className='input'>
  <option value="" disabled> * choose Orientation</option>
  {Orientation.map((orientation) => {
    return (
      <option key={orientation.id} value={orientation.name}>
        {orientation.name}
      </option>
    );
  })}
</select> */}
 

<select
  required name="frame"
  value={product.frame} 
  onChange={(e) => handleInputChange(e)} className='input'>
  <option value="" disabled> * Frame</option>
  {Frame.map((frame) => {
    return (
      <option key={frame.id} value={frame.name}>
        {frame.name}
      </option>
    );
  })}
</select>


<CountryDropdown
className='shippingContInput'
valueType="short"
value={product.country}
onChange={(val) =>
handleInputChange({
target: {
name: "country",
value: val,
},
})
}
/>         

<input type="text"
  placeholder=" * Shipping fee ($USD)"
  required
  name="shipfee"
  value={product.shipfee}
  onChange={(e) => handleInputChange(e)}
className='input' />          

{/* Certificate of authenticity */}


 <input type="text"
  placeholder="Certificate of authenticity"
  required
  name="certificate"
  value={product.certificate}
  onChange={(e) => handleInputChange(e)}
className='input' />
    
<textarea 
placeholder="Description"  
required
name="desc"
onChange={(e) => handleInputChange(e)}              
value={product.desc} className="input" >
</textarea>                    
  </div>
 </div>                                                                 
 <div className='sumbit'
//  onClick={addProduct}
 >       
<button className="btn">
<h1>
      {detectForm(id, 'Submit', 'Edit')}         
     </h1>
</button>       
     
     {/* <p> {percent} "% done"</p> */}
    <p> {uploadProgress} "% done"</p>
 
  </div>
</div>
 
 </div>
 </form>
       </div>
  
    </>
  );
};

export default AddProduct;
