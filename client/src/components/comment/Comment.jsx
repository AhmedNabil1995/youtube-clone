import './comment.scss'
import {format} from 'timeago.js';
const Comment = ({comment}) => {
  return (
    <div className='comment'>
        <div className='img_container'>
            <img src={comment?.user?.image} alt='' />
        </div>
        <div className='content'>
            <div className='publish'>
                <p className='commnet_publisher'>{comment?.user?.name}</p>
                <span className='time'>{format(comment.createdAt)}</span>
            </div>
            <p className='desc'>{comment.text}</p>
        </div>
    </div>
  )
}

export default Comment