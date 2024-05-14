import { useEffect, useState } from "react";

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
interface forPokemonNumber{
    count:number,
    next:string,
    previous:null,
    results:[]
}

function GetPokemon(id:number){
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

function GetNumber(){
    const [data, setData] = useState<forPokemonNumber>()
    useEffect(()=>{
        async function fetchData(){
            const response = await fetch("https://pokeapi.co/api/v2/pokemon");
            const number:forPokemonNumber = await response.json();
            setData(number);
        }
        fetchData()
    },[data])
    return data?.count;
}

export default function RandomPokemon(){
    const [random, setRandom] = useState<number>(0);
    const [pokemon, setPokemon] = useState<Pokemon>();

    useEffect(()=>{
        async function fetchData(){
            const numberOfPokemon = GetNumber() || 1302; // conditional to delete undefined
            setRandom(Math.floor(Math.random() * numberOfPokemon) + 1);
            setPokemon(GetPokemon(random));
            console.log(pokemon);
        }
        fetchData();
    },[random, pokemon])
    return pokemon;
}