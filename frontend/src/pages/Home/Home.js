import './Home.css'
import PhotoItem from '../../components/PhotoItem/PhotoItem'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect} from 'react'
import { getAllPhotos, likePhoto, removeLikePhoto} from '../../slices/photoSlice'
import { Link } from 'react-router-dom'

function Home() {

  const dispatch=useDispatch()

  const {photos}=useSelector(state=>state.photo)
  const {user}=useSelector(state => state.auth)

  useEffect(()=>{
    dispatch(getAllPhotos())
  },[dispatch])
  

  function handleLike(id){
    dispatch(likePhoto(id))
  }


  function handleRemoveLike(id){
      dispatch(removeLikePhoto(id))
  }

  return (
    <div className='home'>
      
    {photos && photos.length !==0 &&
      photos.map((photo,index) => {
        if(index <=9){
          //deixar só as 10 postagens mais recentes
          return (
            <div className='home-div' key={photo._id}>
              <PhotoItem key={index} onPhoto={photo} index={index} handleLike={handleLike} handleRemoveLike={handleRemoveLike} /> 
            </div>
          )
        }
        return false
    })}
    {photos && photos.length === 0 && (
      <h2 className="no-photos">
        Ainda não há fotos publicadas,
        <Link to={`/users/${user.userId}`}> clique aqui</Link> para começar.
      </h2>
    )}
  </div>
  )
}

export default Home