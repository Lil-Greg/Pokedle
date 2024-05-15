import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    navigate('/game')
  }
  return (
    <>

      <h1 className='game-heading'>Pokedle!</h1>
      <img src="./assets/twelveYearOld.jpg" className='logo' alt="Ash Ketchum" onClick={handleSubmit} />
      <form className='play-form' onSubmit={handleSubmit}>
        <button className='play-button'>Play Pokedle</button>
      </form>
    </>
  )
}

export default App
