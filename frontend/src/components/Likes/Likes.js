import { useDispatch, useSelector } from 'react-redux';
import { profile } from '../../slices/userSlice';
import './Likes.css'

import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useEffect } from 'react';

function Likes({ photo, handleLike , handleRemoveLike , type}) {

    const {user}=useSelector(state=>state.user)
    const {loading}=useSelector(state=>state.photo)

    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(profile())
    },[dispatch])

    function verifyLike(){
      let like=false

      for(let i=0;i<photo.likes.length;i++){
        if(photo.likes[i].userId===user._id){
          like=true
          break
        }
      }
      
      return like

    }

    return (
        <div className={`like ${type}`}>
          {photo.likes && user && (
            <>
              {photo.likes.includes(user._id) || verifyLike() ? (
                <BsHeartFill onClick={()=>{
                  if(!loading){
                    handleRemoveLike()
                  }
                }} />
              ) : (
                <BsHeart onClick={()=>{
                  if(!loading){
                    handleLike()
                  }
                }} />
              )}
              <p>{photo.likes.length} like(s)</p>
            </>
          )}
        </div>
      );
}

export default Likes