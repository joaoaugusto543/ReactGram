import './NotFound.css'
import Gear from '../../images/gear.png'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='notFound'>   
        <h1>Erro 404</h1>
        <img src={Gear} alt="Engrenagem" />
        <p>Essa página não existe, volte para a <Link to='/'>Home</Link></p>
    </div>
  )
}

export default NotFound