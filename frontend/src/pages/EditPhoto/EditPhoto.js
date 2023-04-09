import { useDispatch, useSelector } from 'react-redux'
import './EditPhoto.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPhotosById, updatePhoto } from '../../slices/photoSlice'
import { uploads } from '../../api/api'

function EditPhoto() {

  const id=useParams().id

  const [title,setTitle]=useState('')
  const [image,setImage]=useState(null)

  const {photo,loading}=useSelector(state=>state.photo)

  const dispatch=useDispatch()
  
  const navigate=useNavigate()

  useEffect(()=>{
    dispatch(getPhotosById(id))
  },[dispatch,id])

  useEffect(()=>{
      setTitle(photo.title)
      setImage(photo.image)
  },[dispatch,photo])

  function handleSubmit(e){
    e.preventDefault()

    const updatedUser={
      id,
      title
    }

    dispatch(updatePhoto(updatedUser))
    navigate('/')
  }

  return (
    <div className="new-photo">
      <h1>Compartilhe algum momento seu:</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título para a foto:</span>
          <input
            type="text"
            placeholder="Insira um título"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
          />
        </label>
        {image && <img className='seePhoto' src={`${uploads}/photos/${image}`} alt={title}/>}
        {!loading && <input type="submit" value="Editar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
      </form>
    </div>
    
  )

}

export default EditPhoto