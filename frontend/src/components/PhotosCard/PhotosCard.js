import './PhotosCard.css'
import {BsHeartFill } from 'react-icons/bs'
import {FaCommentDots} from 'react-icons/fa'
import {useState } from 'react'
import Photo from '../Photo/Photo'
import {uploads} from '../../api/api'
import { useDispatch } from 'react-redux'
import { resetPhoto } from '../../slices/photoSlice'

function PhotosCard({photo}) {

    const [openImage,setOpenImage]=useState(false)

    const dispatch=useDispatch()

    function handleOpenImage(){
        setOpenImage(true)
    }

    function handleCloseImage(){
       setOpenImage(false)
       dispatch(resetPhoto()) 
    }

  return (
    <div className='photos' key={photo._id}>
        {photo.image && (
            <section onClick={handleOpenImage} className='imageCard'>
                <img className='photo' src={`${uploads}/photos/${photo.image}`} alt={photo.title}/>
                <div>
                    <p><BsHeartFill/> {photo.likes.length}</p>
                    <p><FaCommentDots/> {photo.comments.length}</p>
                </div>
            </section>
        )}
        {openImage && <Photo id={photo._id} image={photo.image} onHandleCloseImage={handleCloseImage}/>}
    </div> 
  )
}

export default PhotosCard