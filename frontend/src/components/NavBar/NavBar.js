import './NavBar.css'

import { NavLink,Link, useNavigate} from 'react-router-dom'
import {BsHouseDoorFill,BsFillPersonFill,BsFillCameraFill} from "react-icons/bs";
import {AiOutlineCloseCircle} from 'react-icons/ai'
import useAuth from '../../hooks/useAuth'
import { logout, reset } from '../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../../slices/userSlice';
import { useState } from 'react';
import useQuery from '../../hooks/useQuery';
import { uploads } from '../../api/api';

function NavBar() {
  
  const {auth}=useAuth()
  const {user}=useSelector((state)=>state.auth)
  const [query,setQuery]=useState('')
  const {users}=useQuery(query)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  function handleLogout(){
    dispatch(logout())
    dispatch(reset())
    dispatch(resetUser())
    navigate('/login')  
    window.location.reload()
  }

  function clearQuery(){
    setQuery('')
  }

  return (
    <nav className='nav'>
        <Link to='/'>
            <h1>ReactGram</h1>
        </Link>
        { auth &&
          <div className='search'>
            <form className='search-form'>
                <AiOutlineCloseCircle onClick={clearQuery}/>
                <input type="text" placeholder='Pesquisar' value={query} onChange={(e)=>setQuery(e.target.value)} />
            </form>
            <div className="usersQuery">
              {users && users.length!==0 && query !== '' && users.map(user=>(
                <Link key={user._id} to={`/users/${user._id}`} onClick={clearQuery}>
                  <div className="userQuery">
                    <img src={`${uploads}/user/${user.profileImage}`} alt={user.name} />
                    <span>{user.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          
          </div>
        }
        <ul className='nav-links'>
          {auth ? (
            <>
              <li><NavLink to='/'><BsHouseDoorFill/></NavLink></li>
              <li><NavLink to={`/users/${user?.id}`}><BsFillCameraFill/></NavLink></li>
              <li><NavLink to='/profile'><BsFillPersonFill/></NavLink></li>
              <li><span onClick={handleLogout}>Sair</span></li>  
            </>
          ):(
            <>
              <li><NavLink to='/Register'>Cadastrar</NavLink></li>
              <li><NavLink to='/Login'>Entrar</NavLink></li>
            </>
          )
          }
        </ul>
    </nav>
  )
}

export default NavBar