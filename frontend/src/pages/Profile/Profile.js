import './Profile.css'
import { useEffect, useState } from 'react'
import { uploads } from '../../api/api'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams} from 'react-router-dom'
import { follow, getUserById, removeFollow} from '../../slices/userSlice'
import { getUserPhotos} from '../../slices/photoSlice'
import PhotosCard from '../../components/PhotosCard/PhotosCard'

function Profile() {

 const {id}=useParams()

 const {userPage,loading}=useSelector(state=>state.user)

 const {user : userAuth}=useSelector(state => state.auth)

 const {photos,photo}=useSelector(state=> state.photo)

 const [showFollowers,setShowFollowers]=useState(false)

 const [showFollowing,setShowFollowing]=useState(false)

 const dispatch=useDispatch()

  useEffect(()=>{
    setShowFollowers(false)
    setShowFollowing(false)
  },[id])

  useEffect(()=>{
   dispatch(getUserById(id))
   dispatch(getUserPhotos(id))
  },[dispatch,id,photo])

  function handleShowFollowings(){
    setShowFollowing(true)
  }

 function handleCloseFollowings(){
    setShowFollowing(false)
  }
  
  function handleShowFollowers(){
     setShowFollowers(true)
  }
 
  function handleCloseFollowers(){
     setShowFollowers(false)
  }

  function handleFollow(){
    dispatch(follow(id))
  }
  
  function handleRemoveFollow(){
    dispatch(removeFollow(id))
  }

  function verifyFollowers(){

    let follow=false
    
    for(let i=0;i<userPage.followers.length;i++){
      if(userPage.followers[i].userId===userAuth.id){
        follow=true
        break
      }
    }

    if(follow){
      return true
    }

    return false

  }


  return (
    <div className='profile'>
      { userPage._id === id && 
        <>
          <div className='profile-header'>
            {userPage.profileImage && (
              <img src={`${uploads}/user/${userPage.profileImage}`} alt={userPage.name} />
            )}
            <div className='profile-description'>
              <div className='nameAndButton'>
                <h1>{userPage.name}</h1>
                {userAuth.id && userAuth.id!==id && id && !loading && !verifyFollowers() && (  
                  <button className='seguir' onClick={handleFollow}>Seguir</button>
                )}
                {userAuth.id && userAuth.id!==id && id && !loading && verifyFollowers() && (  
                  <button className='seguindo' onClick={handleRemoveFollow}>Deixar de seguir</button>
                )}
                {userAuth.id && userAuth.id===id && id && !loading && (
                  <Link to='/public' className='publicar'>Publicar</Link>
                )}
              </div>
              <div className='followersandFollowings'>
                <div className='followers'>
                  <p className='userFollowers' onClick={showFollowers ? handleCloseFollowers : handleShowFollowers}>{userPage.followers.length} seguidores</p>
                  <div className='divFollowers'>
                    { showFollowers &&
                      <>
                        {userPage.followers.map((user,index)=>(
                          <Link to={`/users/${user.userId}`} key={index}>
                            <div className='follow'>
                              <img src={`${uploads}/user/${user.userImage}`} alt="" />
                              <p>{user.userName}</p>
                            </div>
                          </Link>
                        ))}
                      </>
                    }
                  </div>
                </div>
                <div className='following'>
                  <p className='userFollowings' onClick={showFollowing ? handleCloseFollowings : handleShowFollowings}>{userPage.following.length} seguindo</p>
                  <div className='divFollowing'>
                    { showFollowing &&
                      <>
                        {userPage.following.map((user,index)=>(
                          <Link to={`/users/${user.userId}`} key={index}>
                            <div key={index} className='userFollowing'>
                              <img src={`${uploads}/user/${user.userImage}`} alt="" />
                              <p>{user.userName}</p>
                            </div>
                          </Link>
                        ))}
                      </>
                    }
                  </div>
                </div>
              </div>
              <p>{userPage.bio}</p>
            </div>
          </div>
          <div className='user-photos'>
            <h2>Fotos publicadas:</h2>
            <div className='photos-container'>
              {photos && photos.length !==0 &&
                photos.map((photo) =>{
                  if(photo.userId===id){
                    return(<PhotosCard key={photo._id} photo={photo} uploads={uploads}/>)
                  }
                  return false
              })
              }
              {photos && photos.length === 0 && <p>Ainda não há fotos publicadas...</p>}
            </div>
          </div>
        </>

      }
    </div>
  )
}

export default Profile