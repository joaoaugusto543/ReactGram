import './EditProfile.css'
import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { profile, removeProfileImage, resetMessage, resetUser, updateUser } from '../../slices/userSlice'
import Message from '../../components/Message/Message'
import { uploads } from '../../api/api'

function EditProfile() {

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [bio,setBio]=useState(null)
  const [password,setPassword]=useState(null)
  const [profileImage,setProfileImage]=useState(null)
  const [previewImage,setPreviewImage]=useState(null)
  const {user,loading,error,message}=useSelector((state)=>state.user)

  const dispatch= useDispatch()

  async function removeImage(){
    dispatch(removeProfileImage())
    setTimeout(()=>{
      dispatch(resetMessage())
    },2000)
    window.location.reload()
  }

  useEffect(()=>{
    dispatch(resetUser())
    dispatch(profile())
  },[dispatch])

  useEffect(()=>{
    if(user){
      setName(user.name)
      setEmail(user.email)
      setBio(user?.bio)
      setProfileImage(user.profileImage)
      setPreviewImage(null)
    }
  },[user,dispatch])

  function handleSubmit(e){
    e.preventDefault()

    const userData={
      name,
      email
    }

    if(bio){
      userData.bio=bio
    }

    if(password){
      userData.password=password
    }

    if(profileImage && profileImage!=='anonimo.png'){
      userData.profileImage=profileImage
    }

    const formData = new FormData()

    const userFormData = Object.keys(userData).forEach((key) =>formData.append(key, userData[key]))

    formData.append("user", userFormData)

    dispatch(updateUser(formData))

    window.location.reload()

  }

  function handleFile(e){
    const image=e.target.files[0]

    setProfileImage(image)
    setPreviewImage(image)
  }

  return (
      <div className='edit-profile'>
        <h2>Edite seus dados</h2>
        <p className="subtitle">
          Adicione uma imagem de perfil, e conte mais um pouco sobre você...
        </p>
        {(user?.profileImage || previewImage) && (
          <div className='preview'>
            <img className="profile-image" src={
              previewImage ? URL.createObjectURL(previewImage) : `${uploads}/user/${user?.profileImage}`
            } alt={user?.name} />
            {  !user.noPhoto && !loading && <button onClick={removeImage} className='removeImage'>Remover imagem</button>}
            {  !user.noPhoto && loading && <button onClick={removeImage} disabled className='removeImage'>Aguarde...</button>}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name || ""}
          />
          <input type="email" placeholder="E-mail" disabled value={email || ""} />
          <label>
            <span>Imagem de Perfil:</span>
            <div className='file'>
                Insira uma foto 
            </div>
            <input type="file" onChange={handleFile} />
          </label>
          <label>
            <span>Bio:</span>
            <input
              type="text"
              placeholder="Descrição do perfil"
              onChange={(e) => setBio(e.target.value)}
              value={bio || ""}
            />
          </label>
          <label>
            <span>Quer alterar sua senha?</span>
            <input
              type="current-password"
              placeholder="Digite sua nova senha"
              onChange={(e) => setPassword(e.target.value)}
              value={password || ""}
            />
          </label>
          {!loading && <input type="submit" value="Atualizar" />}
          {loading && <input type="submit" disabled value="Aguarde..." />}
          {error && <Message msg={error} type="error" />}
          {message && <Message msg={message} type="success" />}
        </form>
      </div>
  )
}

export default EditProfile