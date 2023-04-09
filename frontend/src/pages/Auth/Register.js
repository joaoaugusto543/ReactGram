import { useState , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../../components/Message/Message'
import { reset,register } from '../../slices/authSlice'
import './Auth.css'

function Register() {

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('')
  const {loading,error}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    const user={
      name,
      email,
      password,
      confirmPassword
    }
    await dispatch(register(user))
    navigate('/')
  }

  useEffect(()=>{
    dispatch(reset())
  },[dispatch])

  return (
    <div className='background'>
      <div className='register'>
        <h1>ReactGram</h1>
        <h2 className='subtitle'>Cadastre-se para ver as fotos dos seus amigos.</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Nome'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type='email'
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
          <input
            type='password'
            placeholder='Confirme a senha'
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          {!loading && <input type='submit' value='Cadastrar' />}
          {loading && <input type='submit' disabled value='Aguarde...' />}
          {error && error.map(err=> <Message msg={err} type='error' />)}
        </form>
        <p>Tem uma conta? <Link to='/login'>Conecte-se</Link></p>
      </div>

    </div>
  )
}

export default Register