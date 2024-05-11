
import { useRef, useState } from "react"
import RandomPokemon from "./RandomPokemon";

export default function Pokemon() {
    const [guess, setGuess] = useState(6);
    const pokemon = RandomPokemon(); // Promise still attatched, may have to use an useEffect
    const guessPokemonRef = useRef<HTMLInputElement | undefined>(undefined);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const guessPokemon = guessPokemonRef.current?.value;
        console.log(pokemon)

    };

    return (
        <>
            <form className="guessPokemonForm" onSubmit={handleSubmit}>
                <input type="text" className="guessPokemon" ref={guessPokemonRef} />
                <button>Guess</button>
            </form>
        </>
    )
}