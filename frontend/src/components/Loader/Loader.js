import './Loader.css'

function Loader({type}) {
  return (
    <div className={`background-${type}`}>
        <div className={`loader-${type}`}>

        </div>
    </div>
  )
}

export default Loader