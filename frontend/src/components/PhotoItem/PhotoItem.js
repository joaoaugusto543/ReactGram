import './PhotoItem.css'
import { uploads } from '../../api/api'
import Likes from '../Likes/Likes.js'
import {FaRegComment} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {BsHeartFill} from 'react-icons/bs'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commentPhoto } from '../../slices/photoSlice'
import {BsEmojiSunglasses} from 'react-icons/bs'
import emojis from '../../data/emojis'

function PhotoItem({onPhoto,handleLike,handleRemoveLike,index}) {

    const [showComments,setShowComments]=useState(false)
    const [comment,setComment]=useState('')
    const {user}=useSelector(state => state.auth)
    const [showEmojis,setShowEmojis]=useState(false)

    const dispatch=useDispatch()

    function handleSubmit(e){
        e.preventDefault()

        const userComment={
            id:onPhoto._id,
            msg:comment
        }

        dispatch(commentPhoto(userComment))
        setComment('')
        setShowEmojis(false)
    }

    function addEmoji(emoji){
        setComment(comment + emoji)
    }

    function handleShowEmojis(){
        setShowEmojis(true)
    }

    function handleCloseEmojis(){
        setShowEmojis(false)
    }

    function handleShowComments(){
        setShowComments(true)
    }
    
    function handleCloseComments(){
        setShowComments(false)
    }

    function like(){
        if(!onPhoto.likes.includes(user.id)){
            handleLike(onPhoto._id)
            const svg=document.querySelector(`.heart${index} > svg`)
            svg.style='animation: heart 3s linear normal;'
        }
    }

    function removeLike(){
        handleRemoveLike(onPhoto._id)
        const svg=document.querySelector(`.heart${index} > svg`)
        svg.style='animation: none;'
    }


  return (
    <div className='photoItem'>
        <div className='user-photo'>
            <Link to={`users/${onPhoto.userId}`}><img src={`${uploads}/user/${onPhoto.userImage}`} alt={onPhoto.title}/></Link>
            <Link to={`users/${onPhoto.userId}`}><span>{onPhoto.userName}</span></Link>
        </div>
        <section onDoubleClick={like}>
            <img src={`${uploads}/photos/${onPhoto.image}`} alt={onPhoto.title}/>
            <div className= {`heart heart${index}`}>
                <BsHeartFill/>
            </div>
        </section>
        <h1>{onPhoto.title}</h1>
        <h2>publicado por: <Link to={`/users/${onPhoto.userId}`}>{onPhoto.userName}</Link></h2>
        <div className='likesAndComments'>
            {onPhoto.likes && <Likes photo={onPhoto} handleLike={like} handleRemoveLike={removeLike} type='pageHome' />}
            {!showComments && <p className='comment-home'><FaRegComment onClick={handleShowComments}/>{onPhoto.comments.length} comentários</p>}
            {showComments && <p className='comment-home'><FaRegComment onClick={handleCloseComments}/>{onPhoto.comments.length} comentários</p>}
        </div>
        <div className="comments-home">
            { showComments &&
                <>   <div className="comments-users">
                        {onPhoto.comments && onPhoto.comments.length!==0 && onPhoto.comments.map((comment,index)=>(
                            <div key={index} className='home-comment'>
                                <img src={`${uploads}/user/${comment.userImage}`} alt={comment.userName} />
                                <div className="infoComment">
                                    <Link to={`users/${comment.userId}`}><span>{comment.userName}</span></Link>
                                    <p>{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>  
                <form className='form-comments' onSubmit={handleSubmit}>
                    <input type="text" placeholder='Adicione um comentário...' onChange={(e)=>setComment(e.target.value)} value={comment}/>
                    <input type="submit"  value="Compartilhar" />
                    <BsEmojiSunglasses onClick={showEmojis ? handleCloseEmojis : handleShowEmojis}/>
                </form>
                { showEmojis &&
                    <div className="emojis">
                        {emojis.map((emoji,index)=>(
                            <p key={index} className="emoji" onClick={()=>addEmoji(emoji)}>{emoji}</p>
                        ))}
                    </div>
                }
                </>
            }
        </div>
    </div>
  )
}

export default PhotoItem