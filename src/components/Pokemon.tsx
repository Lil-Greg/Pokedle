
import { useRef, useState } from "react";
import '../App.css';
import RandomPokemon, { PokemonCall } from "./RandomPokemon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

export default function Pokemon() {
    const [numberOfGuesses, setNumberOfGuesses] = useState<number>(6);
    const [correct, setCorrect] = useState<boolean | null>(null);
    const [error404, setError404] = useState<boolean>(false);
    const pokemon = RandomPokemon();
    const guessPokemonRef = useRef<HTMLInputElement>();
    const [guesses, setGuesses] = useState<Array<PokemonCall | null> | null>(null);
    const bst: number | null = pokemon ? pokemon?.stats[0].base_stat + pokemon?.stats[1].base_stat + pokemon?.stats[2].base_stat + pokemon?.stats[3].base_stat + pokemon?.stats[4].base_stat + pokemon?.stats[5].base_stat : null;

    const compareAnswer = async (pokemonGuess: string | undefined): PokemonCall | null => { // Compare the guesses with the answer
        try {
            const fetchData = async () => {
                const data: PokemonCall = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonGuess}`).then(res => res.json());
                return data;
            }
            const answerCheck = await fetchData();
            if (!answerCheck) {
                throw new Error('Failed to Get Pokemon, Invalid Name');
            }
            guesses?.push(answerCheck);
            console.log(answerCheck);
            setError404(false);
            return answerCheck;
        } catch (error) {
            console.error(`Failed to get Pokemon data: ${error}`);
            setError404(true);
            console.log(error404);
            return null;
        }
    };
    // Something wrong with RandomPokemon() continuous re-renders
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const guessPokemon1 = guessPokemonRef.current?.value;
        const guessPokemon = guessPokemon1?.toLowerCase();
        const answerCompared = compareAnswer(guessPokemon);
        const typeOfAnswer = typeof (answerCompared);

        if (typeOfAnswer) {
            guesses?.push(compareAnswer(guessPokemon));
        } else {
            return;
        }
        if (guessPokemon === pokemon?.name) {
            setCorrect(true);
        } else {
            setNumberOfGuesses(numberOfGuesses - 1);
            setCorrect(false);
        }
        // console.log('Separate');
        // console.log(pokemon, guessPokemon, guesses, numberOfGuesses, correct);

    };

    const resetGame = () => {
        setCorrect(null);
        setNumberOfGuesses(6);
        setGuesses(null);
        location.reload(); // reloads page, makes easier to reset RandomPokemon
    }

    return (
        <>
            <div className="container">
                <div className="seeAllPokemon">

                </div>
                <h1 className='game-heading'>Pokedle!</h1>
                <div className="reset">
                    {correct === true ? (
                        <button className="reset-button correct-btn" onClick={resetGame}>Another Pokemon</button>
                    ) : (
                        <button className="reset-button reg-btn" onClick={resetGame}>Another Pokemon</button>
                    )}
                </div>
                <form className="guessPokemonForm" onSubmit={handleSubmit}>
                    <input type="text" name="playerGuess" className="guessPokemon" ref={guessPokemonRef} />
                    <button>Guess</button>
                </form>
                <div className="img-div">
                    {correct === true ? (
                        <span className="correct-img"><img src={pokemon?.sprites.front_default} alt="Pokemon's Sprite" /></span>
                    ) : (<img src={pokemon?.sprites.front_default} alt="Pokemon's Sprite" />)}
                </div>
                <p className="guesses-p">
                    {numberOfGuesses === 0 ? (<span className="no-guess guesses-left">{numberOfGuesses} Guesses</span>)
                        : (
                            <span className="guesses-left">{numberOfGuesses} Guesses {correct === true ? (
                                <FontAwesomeIcon icon={faThumbsUp} />
                            ) : (
                                <FontAwesomeIcon icon={faThumbsDown} />)}</span>
                        )}
                </p>
                <table className="table">
                    <tr className="headers">
                        <th className="singular-header">Pokemon Name</th>
                        <th className="singular-header">Type 1</th>
                        <th className="singular-header">Type 2</th>
                        <th className="singular-header">Stats</th>
                        <th className="singular-header">Weight</th>
                        <th className="singular-header">Height</th>
                        <th className="singular-header">Cries</th>
                    </tr>
                    <tr className="table-row original">
                        <td className="table-data p-name">
                            {correct === true ? (<span className="correct">{pokemon?.name}</span>
                            ) : ('Guess Bozo')}
                        </td>
                        <td className="table-data">
                            <span className={`type-${pokemon?.types[0].type.name} types`}>
                                {pokemon?.types[0].type.name}
                            </span>
                        </td>
                        <td className="table-data">{pokemon?.types.length == 2 ? (
                            <span className={`type-${pokemon?.types[1].type.name} types`}>
                                {pokemon.types[1].type.name}
                            </span>
                        ) : (<span className="none-type">None</span>)}</td>
                        <td className="table-data p-stats">{bst}</td>
                        <td className="table-data p-weight">{pokemon?.weight}</td>
                        <td className="table-data p-height">{pokemon?.height}</td>
                        <td className="table-data p-cries">
                            <audio controls>
                                <source src={pokemon?.cries.latest} type="audio/ogg" />
                            </audio>
                        </td>
                    </tr>
                </table>
            </div>
        </>
    )
}