import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Comment from '../comment/Comment';
import './comments.scss';

const Comments = ({comments,setcomments,video}) => {
   let {currentUser} = useSelector(state=>state.auth)
    let [text,setText] = useState('');
    
   const handleClick = ()=>{

    let comment = {user:currentUser,video:video._id,text}
    axios.post('http://localhost:5000/comments',comment,{
      headers:{
        "access_token":currentUser.token
      },
      
    })
    .then(res=>{
        setcomments(prev=>[{...res.data,user:currentUser},...prev])
        setText('')
    })
    .catch(console.log)
    
}
  return (
    <div className='comments'>
        <div>
            <p className='nums'>{comments.length} comments</p>
        </div>
        <div className='commet_input'>
            <div className='img_container'>
                <img src={currentUser.image} alt=''/>
            </div>
            <div className='add_comment'>
                <input type="text" placeholder='Add comment..' value={text} onChange={e=>setText(e.target.value)}/>
                <div>
                    <button onClick={handleClick}>Comment</button>
                </div>
            </div>
        </div>
        {comments.map(comment=>{
            return <Comment key={comment._id} comment={comment} />
        })}
    </div>
  )
}

export default Comments