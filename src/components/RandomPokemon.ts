import { useEffect, useState } from "react";
import getPokemon from "./getPokemon";

export interface Pokemon{
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


async function getNumber(){
    const response = await fetch("https://pokeapi.co/api/v2/");
    const data = await response.json();
    return await data.count
}

export default function RandomPokemon(){
    const [random, setRandom] = useState<number>(0);
    const [pokemon, setPokemon] = useState<Pokemon>();

    useEffect(()=>{
        async function fetchData(){
            const numberOfPokemon = await getNumber();
            setRandom(Math.floor(Math.random() * numberOfPokemon) + 1);
            setPokemon(getPokemon(random));
        }
        fetchData();
    },[random])
    return pokemon;
}