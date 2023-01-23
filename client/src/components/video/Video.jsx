import Comments from '../comments/Comments';
import './video.scss';
import {format} from 'timeago.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { dislikeVideo, likeVideo, setLike } from '../../redux/Slices/likeSlice';
import { setSubscribe, subscribe } from '../../redux/Slices/subscribeSlice';
import { getUser } from '../../redux/Slices/authSlice';
const Video = ({video}) => {
  let dispatch =  useDispatch()
  let {likes} = useSelector(state=>state.like)
  let {dislikes} = useSelector(state=>state.like)
  let {subscribers} = useSelector(state=>state.subscribe)
  let {currentUser} = useSelector(state=>state.auth)
  let [comments,setcomments] = useState([]);

  useEffect(()=>{
    if(video){
      axios.get(`http://localhost:5000/comments/${video._id}`)
    .then(res=>setcomments(res.data))
    .catch(console.log);
    }
  },[video])

  useEffect(()=>{
    dispatch(setLike({likes:video?.likes||[],dislikes:video?.dislikes||[]}));
    dispatch(setSubscribe(currentUser?.subscribing||[]))
    dispatch(getUser(currentUser._id));
  },[video])

  const handleLike=()=>{
    axios.put(`http://localhost:5000/users/like/${video._id}`,{},{headers:{'access_token':currentUser.token}})
    .then(res=>{
      dispatch(likeVideo(currentUser._id))
    })
    .catch(console.log)
  }
  const handleDislike=()=>{
    axios.put(`http://localhost:5000/users/dislike/${video._id}`,{},{headers:{'access_token':currentUser.token}})
    .then(res=>{
      dispatch(dislikeVideo(currentUser._id))
    })
    .catch(console.log)
  }

  const handleSubscribe=()=>{
    if(subscribers.includes(video.user._id)){
console.log('unsubscribe')
      axios.put(`http://localhost:5000/users/unsubscribe/${video.user._id}`,{},{headers:{'access_token':currentUser.token}})
      .then(res=>{
        dispatch(subscribe(video?.user?._id))
        dispatch(getUser(currentUser._id));
      })
      .catch(console.log)

    }else{
      console.log('subscribe')

      axios.put(`http://localhost:5000/users/subscribe/${video.user._id}`,{},{headers:{'access_token':currentUser.token}})
    .then(res=>{
      dispatch(subscribe(video?.user?._id))
      dispatch(getUser(currentUser._id));
    })
    .catch(console.log)
    }
    
  }

  return (
    <div className='video'>
        <video src={video?.videourl} controls/>
        <div className='video_desc'>
          <div>
            <p className='video_title'>{video?.title}</p>
            <div className='video_info'>
                <p>{video?.views} views . {format(video?.createdAt)}</p>
            </div>
          </div>
          <div className='controls'>
            <div>
              <span><i onClick={handleLike} className={`${likes.includes(currentUser._id)?'fa-solid':'fa-regular'} fa-thumbs-up`}></i> {likes?.length} likes</span>
              <span><i onClick={handleDislike} className={`${dislikes.includes(currentUser._id)?'fa-solid':'fa-regular'} fa-thumbs-down`}></i></span>
            </div>
            <button onClick={handleSubscribe}>{subscribers.includes(video?.user?._id)?'Subscribe':'unsubscribe'}</button>
          </div>
        </div>
        <Comments comments={comments} video={video} setcomments={setcomments}/>
    </div>
  )
}

export default Video