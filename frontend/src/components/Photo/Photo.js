import './Photo.css'
import { useEffect, useState } from 'react'
import { uploads } from '../../api/api'
import {BsThreeDots} from 'react-icons/bs'
import Comments from '../Comments/Comments'
import { useDispatch, useSelector } from 'react-redux'
import { commentPhoto, getPhotosById, likePhoto, removeLikePhoto} from '../../slices/photoSlice'
import Loader from '../Loader/Loader'
import Likes from '../Likes/Likes'
import WarningDelete from '../WarningDelete/WarningDelete'
import photoServices from '../../services/photoServices'
import { Link } from 'react-router-dom'
import {BsEmojiSunglasses} from 'react-icons/bs'
import emojis from '../../data/emojis'

function Photo({id,image,onHandleCloseImage}) {

  const {photo,loading}=useSelector(state=> state.photo)

  const token=JSON.parse(localStorage.getItem('user')).token

  const dispatch=useDispatch()

  const [openMenu,setOpenMenu]=useState(false)

  const [comment,setComment]=useState('')

  const [showWarnig,setShowWarning]=useState(false)

  const [showEmojis,setShowEmojis]=useState(false)

  useEffect(()=>{
    dispatch(getPhotosById(id))
  },[dispatch,id])
  
  function handleOpenMenu(){
    
    setOpenMenu(true)
    
    const menu=document.querySelector('.menu')
    const buttonDelete = document.querySelector('.delete')
    const buttonEdit = document.querySelector('.edit')
    
    menu.style='display:block;border:2px solid #fff'
    buttonDelete.style='display:block;'
    buttonEdit.style='display:block;'
    
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

  function handleCloseWarning(){
    setShowWarning(false)
  }

  function handleOpenWarning(){
    setShowWarning(true)
  }
  
  function handleCloseMenu(){
    setOpenMenu(false)
    
    const menu=document.querySelector('.menu')
    const buttonDelete = document.querySelector('.delete')
    const buttonEdit = document.querySelector('.edit')
    
    menu.style='display:none;border:none'
    buttonDelete.style='display:none;'
    buttonEdit.style='display:none;'
  }

  function handleLike(){
    dispatch(likePhoto(id))
  }

  function handleRemoveLike(){
    dispatch(removeLikePhoto(id))
  }

  function deletePhoto(){
    handleCloseMenu()
    onHandleCloseImage()
    photoServices.deletePhoto(id,token)
    window.location.reload()
  }
  
  
  function handleSubmit(e){
    e.preventDefault()
    
    const userComment={
      id,
      msg:comment
    }
    
    dispatch(commentPhoto(userComment))
    setComment('')
    setShowEmojis(false)
  }

  return (
    <div className='photoBackGround'>
      {showWarnig && <WarningDelete handleCloseWarning={handleCloseWarning} deletePhoto={deletePhoto}/> }
      <div className='photoCard'>
        <img className='image' src={`${uploads}/photos/${image}`} alt={photo?.title} />    
        <div className='commentsAndLikes'>
            <div className="config">
                {!openMenu && <BsThreeDots onClick={handleOpenMenu}/>}
                {openMenu && <BsThreeDots onClick={handleCloseMenu}/>}
                <div className='menu'>
                  <button className='delete' onClick={handleOpenWarning}>Deletar</button>
                  <Link to={`/photo/${id}`}><button className='edit'>Editar</button></Link>
                </div>
            </div>
            <div className='commentsContainer'> 
                { !loading && <Comments Oncomments={photo?.comments} uploads={uploads}/>}
                { loading && <Loader type='comments'/>}         
            </div> 
            <div className="likes">
              <Likes photo={photo} handleLike={handleLike} handleRemoveLike={handleRemoveLike}/>
            </div>
            <div className="form">
              <form className="commentForm" onSubmit={handleSubmit} >
                <input type="text" placeholder='Adicione um comentário...' onChange={(e)=>setComment(e.target.value)} value={comment} />
                <input type="submit" id='compartilharComment' value="Compartilhar"/>
                <BsEmojiSunglasses onClick={showEmojis ? handleCloseEmojis : handleShowEmojis}/>
              </form> 
                { showEmojis &&
                      <div className="emojis card">
                          {emojis.map((emoji,index)=>(
                              <p key={index} className="emoji" onClick={()=>addEmoji(emoji)}>{emoji}</p>
                          ))}
                      </div>
                  }
            </div>
        </div>
        <p onClick={onHandleCloseImage} className='close'>x</p>
      </div>
    </div>
  )
}

export default Photo