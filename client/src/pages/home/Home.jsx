import { useEffect, useState } from 'react';
import SideNav from '../../components/sideNav/SideNav';
import VideoCart from '../../components/videoCart/VideoCart';
import './home.scss';
import axios from 'axios'
import { useSelector } from 'react-redux';

const Home = ({type}) => {
  let [videos,setVideos] = useState([]);
  let {currentUser} = useSelector(state=>state.auth);
  useEffect(()=>{
    axios.get(`http://localhost:5000/videos/${type}`,{headers:{"access_token":currentUser?.token}})
    .then(res=>setVideos(res.data))
    .catch(console.log);
  },[type])
  return (
    <div className='home'>
      <div className='row'>
        <div className='col-1'>
        <SideNav />
        </div>
        <div className='col-2'>
          <div className='container'>
            <div className='row'>
              {videos.map(video=>{
                return <VideoCart key={video._id} video={video}/>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home