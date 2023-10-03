import React, { useEffect, useState } from 'react'
import '../Styles/EditProfile.css'
import { useSelector } from "react-redux";
import { selectEmail, selectUserName } from '../redux/slice/authSlice';
import { useNavigate } from 'react-router-dom';
import { CountryDropdown } from 'react-country-region-selector'
import { auth, db, storage } from "../firebase/config";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
  import {
   getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../auth/AuthContext';
import { toast } from 'react-toastify';
 const initialState = 
    {
    displayName: "",
    lastName: "",
    bio:"",
    email: "",
    phone_number:"",
    country:"",
    insta:"",
    profImage: "",
    twitter: "",
    facebook: "",
     
    }

 

   const EditProfile = () => {
     const userName = useSelector(selectUserName);
 
    const [desc, setDesc] = useState('')
    const [uploadProgress, setUploadProgress] = useState(0);
    const [data, setData] = useState([]);
     const {user} = useAuth() 
    const [profile, setProfile ] = useState ({
        ...initialState
    })
    


    useEffect(() => {
      onAuthStateChanged(auth, (user)=>{
        if (user){
          const uid =  user.uid;
          console.log(uid)
          const artistDocRef = doc(db, 'users', uid);
          const fetchArtist = async () => {
            const docSnap = await getDoc(artistDocRef);
            setData([{...docSnap.data(), id: docSnap.id}]);
          };
          fetchArtist();
        }
      })      
    },[])

    const navigate = useNavigate()
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
      };
      // function handleChange(event) {
      //   setImage(event.target.files[0]);
      //   } 

        const handleImageChange = (e) => {
          const file = e.target.files[0];
          // console.log(file);
        
          const storageRef = ref(storage, `editProf/${Date.now()}${file.name}`);
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
                setProfile({ ...profile, profImage: downloadURL });
                toast.success("Image uploaded successfully.");
              });
            }
          );
        };
             



    const updateProfile = async(e)=>{
         try{
            e.preventDefault()
            const ref = doc(db, 'profileUpdate', user.uid)
            const docRef =  await setDoc(ref, 
                {
                 lastName:profile.lastName,
                profImage: profile.profImage,
                email: profile.email,
                desc:desc,
                insta: profile.insta,
                twitter:profile.twitter,
                facebook:profile.facebook,
                displayName:profile.displayName,
                createdAt: serverTimestamp(),
                country:profile.country,
                profID:user.uid,
                phone_number:profile.phone_number,
                })

                 
                navigate('/profile')
                setProfile({...initialState})
                console.log(docRef)
         }
          catch(error){
            console.log(error)
    }
    }

  // const File = ()=>{
  //   document.getElementById("profimage").click();
  //   }
  //   const binaryData = []
  //   binaryData.push(profImage)
  //   const blob = new Blob(binaryData, {type: "image/png"})
  //   const url = URL.createObjectURL(blob)


    // const CoverImg = ()=>{
    //   document.getElementById("profimage").click();
    //   }
    //   const CoverbinaryData = []
    //   binaryData.push(profImage)
    //   const blob = new Blob(binaryData, {type: "image/png"})
    //   const url = URL.createObjectURL(blob)

    // upload image to firebase

     
 
  return (
    <>
    <div className='editprofMain'>
        
         <div className='editprofCont'>
         
         <h1 className="edit-profile">Edit Profile</h1> 
{/*          
     <input type='file' id='CoverImg'   style={{display:'none'}}/>
     <div className='CoverImg' id='cover'
    onClick={CoverImage}
    >  
    <img src={CoverImage}alt='' />  
    </div> */}
          <div className='profImg'>
        <div className='profImg2'>
    
        </div>            
            <div className='profInfoDet'>
            {
          data.map((user, index)=>{
            return(
              <div key={index}>
                <h3>{user.displayName}</h3>
              </div>
            )
          })
        }
{/*  
            <div onClick={File} >
            <h2>Change photo</h2>
            </div>
       */}
        <input
    type="file"
    accept="image/*"
    placeholder="Product Image"
    name="image"
     onChange={(e) => handleImageChange(e)}
  />   
            </div>
             
   
             {profile.image === "" ? null : (
                <input
                  type="text"
                  required
                  placeholder="Image URL"
                  name="image"
                  value={profile.image}
                  disabled
                  style={{display:'none'}}
                />
              )}
        </div>
        <form 
        onSubmit={updateProfile}
        action='' >
            <div   >
            <div className='editprofdets '>
            <label htmlFor="">First Name:</label><br></br>
            <input type="text" required placeholder="First Name" name='displayName' value={profile.displayName}  onChange={(e)=>handleInputChange(e)} /><br></br>
            </div>
             <div className='editprofdets '>
             <label htmlFor="">Last Name:</label><br />
            <input type="text" placeholder="Last name" name='lastName' value={profile.lastName} onChange={(e)=>handleInputChange(e)} /><br></br>
             </div>              
            <div className='editprofdets '>
            <label htmlFor="">Select Country:</label><br></br>

<CountryDropdown
className='shippingContInput'
required
valueType="short"
value={profile.country}
onChange={(val) =>
handleInputChange({
        target: {
          name: "country",
          value: val,
        },
      })
    }
  />    
          <div className='editprofdets '>
             <label htmlFor="">Phone Number:</label><br /> 
             <input type="number" required placeholder="Phone Number" name='phone_number' value={profile.phone_number} onChange={(e)=>handleInputChange(e)} /><br></br>
             </div>
            </div> 
            
    <div className='editprofdets '>
    <label htmlFor="">Email Address:</label><br></br>
    <input type="email" required placeholder='Email:' name='email' value={profile.email}  onChange={(e)=>handleInputChange(e)} /><br></br>
    </div>

    <div className='editprofdets '>
    <label htmlFor="">Instagram:</label><br></br>
    <input type="text"   placeholder='Instagram URL or Link' name='insta' value={profile.insta}  onChange={(e)=>handleInputChange(e)} /><br></br>
    </div>

    <div className='editprofdets '>
    <label htmlFor="">Twitter:</label><br></br>
    <input type="text"   placeholder='Twitter URL or Link' name='twitter' value={profile.twitter}  onChange={(e)=>handleInputChange(e)} /><br></br>
    </div>

    <div className='editprofdets '>
    <label htmlFor="">Facebook:</label><br></br>
    <input type="text"   placeholder='Facebook URL or Link' name='facebook' value={profile.facebook}  onChange={(e)=>handleInputChange(e)} /><br></br>
    </div>

           <div className='editprofdets ' >
           <label htmlFor="">Biography:</label><br></br>
           <textarea placeholder="Biography" required onChange={(e)=>setDesc(e.target.value)} value={desc} className="desc" >
            </textarea>
           </div>
        </div> 
        <button className='btn1' 
         >Save</button>   
        <p> {uploadProgress} "% done"</p>                     
         </form>
         </div>
    </div>
    </>
  )
}

export default EditProfile