import './Post.css'
import { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { insertPhoto } from '../../slices/photoSlice'

function Post() {

  const [title,setTitle]=useState('')
  const [image,setImage]=useState(null)

  const {loading}=useSelector(state=>state.photo)
  const {user}=useSelector(state=>state.auth)

  const dispatch=useDispatch()
  
  const navigate=useNavigate()

  function handleSubmit(e){
    e.preventDefault()

    const photo={
      title,
      image
    }

    const formData = new FormData()

    const photoFormData =Object.keys(photo).forEach((key) =>formData.append(key, photo[key]))

    formData.append("photo", photoFormData)
    
    dispatch(insertPhoto(formData))

    navigate(`/users/${user.id}`)
    

  }

  function handleFile(e){
    const image=e.target.files[0]
    setImage(image)
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
        <label className='file'>
          <span>Insira uma imagem</span>
          <input type="file" onChange={handleFile} />
        </label>
        {image && <img className='seePhoto' src={URL.createObjectURL(image)} alt={title}/>}
        {!loading && <input type="submit" value="Postar" />}
        {loading && <input type="submit" disabled value="Aguarde..." />}
      </form>
    </div>
    
  )
}

export default Post