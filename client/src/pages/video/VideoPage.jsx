import './videoPage.scss'
import Video from '../../components/video/Video';
import VideoCart from '../../components/videoCart/VideoCart';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VideoPage = () => {
  const [videos,setVideos] = useState([]);
  const [video,setVideo] = useState(null);
  let {id} = useParams();

  useEffect(()=>{
    if(id){
      axios.get(`http://localhost:5000/videos/find/${id}`)
    .then(res=>{
      setVideo(res.data);
      axios.get(`http://localhost:5000/videos/related?tags=${res?.data?.tags}`)
      .then(res=>setVideos(res.data))
      .catch(console.log)
    })
    .catch(console.log);
    }
  },[id])
  return (
    <div className='videoPage'>
        <div className='row'>
            <div className='col-1'>
                <Video video={video} />
            </div>
            <div className='col-2'>
              {videos.map(video=>{
                return <VideoCart key={video._id} video={video} />
              })}
            </div>
        </div>
    </div>
  )
}

export default VideoPage