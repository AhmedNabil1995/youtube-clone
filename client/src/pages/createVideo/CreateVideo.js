import React, { useState } from 'react'
import './createVideo.scss'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import { toggleOpen } from '../../redux/Slices/OpenModelSlice';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../firebase";

const CreateVideo = () => {
let [video,setVideo] = useState({});
let [videoProgress,setVideoProgress] = useState();
let [imageProgress,setImageProgress] = useState();
let dispatch = useDispatch();
let {currentUser} = useSelector(state=>state.auth)

const handleChange = (e)=>{
    setVideo({...video,[e.target.name]:e.target.value})
}

const handleSubmit = (e)=>{
    e.preventDefault();
    
    axios.post('http://localhost:5000/videos',video,{
      headers:{
        "access_token":currentUser.token
      },
      
    })
    .then(()=>{dispatch(toggleOpen())})
    .catch(console.log)
    
}



const upload = (file,type)=>{
    const storage = getStorage(app);

let fileName = new Date().getDate() + file.name;
// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = ref(storage,fileName);
const uploadTask = uploadBytesResumable(storageRef, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    if(type=="image"){
      setImageProgress(progress)
    }else{
      setVideoProgress(progress)
    }
  }, 
  (err) => {
    console.log(err)
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        if(type==='image'){
            setVideo(prev=>({...prev,thumbnail:downloadURL}));
        }else{
            setVideo(prev=>({...prev,videourl:downloadURL}));
        }

      console.log('File available at', downloadURL);
    });
  }
);
}
const handleClose = (e)=>{
  dispatch(toggleOpen())
}
  return (
    <div className='create-video' onClick={handleClose}>
        <form onSubmit={handleSubmit} onClick={e=>e.stopPropagation()}>
        <h2>Add new video</h2>
      <div className='input-item'>
        <input type='text' name='title' placeholder='add title' onChange={handleChange}/>
      </div>
      <div className='input-item'>
        <input type='text' name='tags' placeholder='add tags' onChange={handleChange}/>
      </div>
      <div className='input-item'>
        <label htmlFor='video'>video</label>{videoProgress}
        <input id='video' type='file' name='videoUrl' onChange={(e)=>upload(e.target.files[0],'video')}/>
      </div>
      <div className='input-item'>
        <label htmlFor='image'>Image</label>{imageProgress}
        <input id='image' type='file' name='thumbnail'onChange={e=>upload(e.target.files[0],'image')} />
      </div>
      <div>
        <button type='submit'>add video</button>
      </div>
    </form>
    </div>
  )
}

export default CreateVideo
