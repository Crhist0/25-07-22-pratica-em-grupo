import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../../services/api";
import { AppDispatch } from "../../store";
import { setPokemon as setPokemonReduce } from "../../store/modules/pokemon/pokemonSlice"
import { State } from "../../store/modules/rootReducer";

type TPokemon = {
  name?: string
  moves?:{
    move:{
      name: string,
      url: string
    }, 
    version_group_details:{
      level_learned_at: number,
      move_learn_method:{
        name: string,
        url: string
      },
      version_group:{
        name: string,
        url: string
      },
    }[],
  }[]
}

function Home() {
  const [pokemon, setPokemon] = useState<TPokemon>({});
  const [name, setName] = useState<string | number>("");
  const pokemonReduce: TPokemon = useSelector((state: State) => state.pokemon);
  const dispatch = useDispatch<AppDispatch>();

  const get = async()=>{
    const response = await getPokemon(name);
    setPokemon(response);
  }  

  useEffect(()=>{
    console.log("Enviando Pokemon para o reduce");
    dispatch(setPokemonReduce(pokemon))
  },[pokemon])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)        
  }

  // useEffect(()=>{
  //   console.log(name);
  // },[name])

  return (
    <>
    <TextField
  id="outlined-name"
  label="Name"
  value={name} 
  onChange={handleChange}
/>
    <Typography variant="body2">
      {pokemonReduce?.name}
    </Typography>
    
    {pokemonReduce?.moves?.filter((move)=>move?.version_group_details[0]?.level_learned_at > 0)
      .map((move)=><Typography key={move.move.name}>{move.move.name + ` - ` + move.version_group_details[0].level_learned_at}</Typography>) 
    
    }    
      <Button variant="contained" onClick={get}>Pesquisar</Button>
    </>
  );
}

export default Home;
