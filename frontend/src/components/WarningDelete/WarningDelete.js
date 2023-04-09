import './WarningDelete.css'

function WarningDelete({handleCloseWarning,deletePhoto}) {
  return (
    <>
        <div className='backgroundWarning'></div>
        <div className='warning'>
            <div>
                <h1>Deseja mesmo apagar essa foto?</h1>
                <button onClick={deletePhoto}>Sim</button>
                <button onClick={handleCloseWarning}>Não</button>
            </div>
        </div>
    </>
  )
}

export default WarningDelete