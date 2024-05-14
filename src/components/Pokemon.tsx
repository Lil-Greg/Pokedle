
import { useRef, useState } from "react"
import RandomPokemon from "./RandomPokemon";

export default function Pokemon() {
    const [guess, setGuess] = useState<number>(6);
    const [correct, setCorrect] = useState<boolean | null>(null);
    const randomPokemon = RandomPokemon();
    const pokemonName = randomPokemon?.name; // Promise still attatched, may have to use an useEffect
    const guessPokemonRef = useRef<HTMLInputElement | undefined>(undefined);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const guessPokemon = guessPokemonRef.current?.value;
        if (guessPokemon === pokemonName) {
            setCorrect(true)
        } else {
            setGuess(guess - (guess - 1));
        }
        console.log(randomPokemon, guessPokemon);

    };

    return (
        <>
            <div className="container">
                <form className="guessPokemonForm" onSubmit={handleSubmit}>
                    <input type="text" name="playerGuess" className="guessPokemon" ref={guessPokemonRef} />
                    <button>Guess</button>
                </form>
                <div className="table-div">
                    <table className="table">
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
                            <td className="t-data"></td>
                            <td className="t-data"></td>
                            <td className="t-data"></td>
                            <td className="t-data"></td>
                            <td className="t-data"></td>
                        </tr>
                    </table>
                </div>
                <div className="reset">
                    <button className="reset-button">Another Pokemon</button>
                </div>
            </div>
        </>
    )
}