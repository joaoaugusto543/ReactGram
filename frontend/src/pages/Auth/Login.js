import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import Message from '../../components/Message/Message'
import { login, reset } from '../../slices/authSlice'
import './Auth.css'

function Login() {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {loading,error}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()

  async function handleSubmit(e){
    e.preventDefault()

    const user={
      email,
      password
    }

    dispatch(login(user))
  }

  useEffect(()=>{
    dispatch(reset())
  },[dispatch])

  return (
    <div className='background'>
      <div className='login'>
        <h1>ReactGram</h1>
        <p className='subtitle'>Faça o login para ver o que há de novo.</p>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='E-mail'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type='password'
            placeholder='Senha'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!loading && <input type='submit' value='Entrar' />}
          {loading && <input type='submit' disabled value='Aguarde...' />}
          {error && error.map((err,index)=><Message key={index} msg={err} type='error' />)}
        </form>
        <p>Não tem uma conta? <Link to='/register'>Cadastre-se</Link></p>
      </div>
    </div>
  )
}

export default Login