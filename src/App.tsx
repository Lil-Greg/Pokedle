import { useState } from 'react';
import Pokemon from './components/Pokemon';
import './App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const [displayGame, setDisplayGame] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setDisplayGame(true);
  }
  return (
    <>

      <h1 className='game-heading'>Pokedle!</h1>
      {displayGame === false ? (
        <>
          <img src="./assets/twelve_year_old.jpg" className='logo' alt="Ash Ketchum" />
          <form className='play-form' onSubmit={handleSubmit}>
            <button className='play-button'>Play Pokedle</button>
          </form>
        </>
      ) : (
        navigate('/game')
      )}
    </>
  )
}

export default App
