import { useEffect, useState } from "react";

interface Pokemon{
    cries:{
        latest:string
    },
    height:number,
    id:number,
    name:string,
    sprites:{
        front_default:string
    },
    stats:[
        index:{base_stat:number}
    ],
    types:[
        index:{
            slot:number,
            type:{
                name:string,
                url:string
            }
        }
    ],
    weight:number
}

// function GetPokemon(id:number){
//     async function fetchData(){
//         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
//         const data = await response.json();
//         return data
//     }

    
//     return pokemon;
// }

export default function RandomPokemon(){
    const [pokemon, setPokemon] = useState<Pokemon>();

    useEffect(()=>{
        async function fetchData(){
            const random = Math.floor(Math.random() * 1302) + 1;
            const pokemonRandom: Pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`).then(response => response.json())
            setPokemon(pokemonRandom);
            console.log(pokemon);
        }
        fetchData();
    },[pokemon])
    return pokemon;
}