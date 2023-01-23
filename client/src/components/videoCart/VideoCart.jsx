import './videoCart.scss'
import {format} from 'timeago.js'
import { Link } from 'react-router-dom'

const VideoCart = ({video}) => {
  return (
    <div className='videoCart'>
        <div className='row'>
            <Link to={`/video/${video._id}`} className='col-1'>
                <img src={video.thumbnail} alt=''/>
            </Link>
            <div className='col-2'>
                <div className='img_container'>
                    <img src={video.user.image} alt=''/>
                </div>
                <div className='content'>
                    <p className='video_title'>{video.title}</p>
                    <p className='video_publisher'>{video.user.name}</p>
                    <p className='video_info'>{video.views} views . {format(video.createdAt)}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VideoCart