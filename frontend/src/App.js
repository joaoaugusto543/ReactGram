import './App.css'
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Footer from './components/Footer/Footer'
import NavBar from './components/NavBar/NavBar'
import useAuth from './hooks/useAuth'
import Profile from './pages/Profile/Profile'
import EditProfile from './pages/EditProfile/EditProfile'
import NotFound from './pages/NotFound/NotFound'
import Loader from './components/Loader/Loader'
import Post from './pages/Post/Post'
import EditPhoto from './pages/EditPhoto/EditPhoto'

function App() {
  const {auth,loading}=useAuth()

  if(loading){
    return <Loader type='page'/>
  }

  return (
    <div className="App">
      <Router>
          <NavBar/>
          <div className="container">
            <Routes>
              <Route path='/' element={auth ? (<Home/>) : (<Navigate to='/login'/>)}/>
              <Route path='/register' element={!auth ? (<Register/>) : (<Navigate to='/'/>)}/>
              <Route path='/login' element={!auth ? (<Login/>) : (<Navigate to='/'/>)}/>
              <Route path='/profile' element={auth ? (<EditProfile/>) : (<Navigate to='/login'/>)}/>
              <Route path='/users/:id' element={auth ? (<Profile/>) : (<Navigate to='/login'/>)}/>
              <Route path='/public' element={auth ? (<Post/>) : (<Navigate to='/login'/>)}/>
              <Route path='/photo/:id' element={auth ? (<EditPhoto/>) : (<Navigate to='/login'/>)}/>
              <Route path='*' element={auth ? (<NotFound/>) : (<Navigate to='/login'/>)}/>
              <Route/>
            </Routes>
          </div>
          <Footer/>
      </Router>
    </div>
  )
}

export default App
