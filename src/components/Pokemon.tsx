
import { useRef, useState } from "react";
import RandomPokemon, { PokemonCall } from "./RandomPokemon";

export default function Pokemon() {
    const [numberOfGuesses, setNumberOfGuesses] = useState<number>(6);
    const [correct, setCorrect] = useState<boolean | null>(null);
    const [error404, setError404] = useState<boolean | null>(null)
    const pokemon = RandomPokemon();
    const guessPokemonRef = useRef<HTMLInputElement>();
    const [guesses, setGuesses] = useState<Array<PokemonCall> | null>(null);

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
            console.log(answerCheck);
            guesses?.push(answerCheck);
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
        compareAnswer(guessPokemon);
        if (guessPokemon === pokemon?.name) {
            setCorrect(true);
        } else {
            setNumberOfGuesses(numberOfGuesses - (numberOfGuesses - 1));
        }
        console.log(pokemon, guessPokemon, guesses);

    };

    const resetGame = () => {
        setCorrect(null);
        setNumberOfGuesses(6);
        setGuesses(null);
    }

    return (
        <>
            <div className="container">
                <h1 className='game-heading'>Pokedle!</h1>
                <form className="guessPokemonForm" onSubmit={handleSubmit}>
                    <input type="text" name="playerGuess" className="guessPokemon" ref={guessPokemonRef} />
                    <button>Guess</button>
                </form>
                <div className="table-div">
                    <table className="table" style={{ border: '1px solid white' }}>
                        <tr className="headers">
                            <th className="singular-header">Pokemon Name</th>
                            <th className="singular-header">Type 1</th>
                            <th className="singular-header">Type 2</th>
                            <th className="singular-header">Stats</th>
                            <th className="singular-header">Weight</th>
                            <th className="singular-header">Height</th>
                        </tr>
                        <tr className="table-data">
                            <td className="t-data"></td>
                            <td className="t-data">{pokemon?.types[0].type.name}</td>
                            <td className="t-data">{pokemon?.types[1]?.type.name}</td>
                            <td className="t-data"></td>
                            <td className="t-data"></td>
                            <td className="t-data"></td>
                        </tr>
                    </table>
                </div>
                <div className="reset">
                    <button className="reset-button" onClick={resetGame}>Another Pokemon</button>
                </div>
            </div>
        </>
    )
}