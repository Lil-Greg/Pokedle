import { useEffect, useState } from "react";

export interface PokemonCall{
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
        index0:{
            slot:number,
            type:{
                name:string,
                url:string
            }
        },
        index1:{
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
    const [pokemon, setPokemon] = useState<PokemonCall>();

    useEffect(()=>{
        async function fetchData(){
            const random = Math.floor(Math.random() * 1025) + 1;
            const pokemonRandom: PokemonCall = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`).then(response => response.json())
            setPokemon(pokemonRandom);
        }
        fetchData();
    },[pokemon])
    return pokemon;
}