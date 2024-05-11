import { useEffect, useState } from "react";
import { Pokemon } from "./RandomPokemon";

export default function getPokemon(id:number){
    const [pokemon, setPokemon] = useState<Pokemon>();

    useEffect(() =>{
        async function fetchData(){
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            setPokemon(data);
        }
        fetchData();
    }, [id]);
    
    return pokemon;
}