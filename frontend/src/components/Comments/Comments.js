import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './Comments.css'

function Comments({Oncomments,uploads}) {

  const [comments,setComments]=useState([])


  useEffect(()=>{
    setComments(Oncomments)
  },[Oncomments])
  
  return (
    <ul className='comments'>
        {comments && comments.length!==0 ? comments.map((comment,index)=>(
            <li key={index} className='comment'>
                <img className='imageComment' src={`${uploads}/user/${comment.userImage}`} alt={comment.userName} />
                <p className='textComment'><Link to={`/users/${comment.userId}`}><span>{comment.userName}</span></Link> {comment.comment}</p>
            </li>   
        )):(
          <h1 className='semComentario'>Ainda não há nenhum comentário.</h1>
        )}
    </ul>
  )
}

export default Comments