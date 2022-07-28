import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../../services/api";
import { AppDispatch } from "../../store";
import { setPokemon as setPokemonReduce, fetchPokemon } from "../../store/modules/pokemon/pokemonSlice"
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
  const [name, setName] = useState<string | number>("");
  const pokemonReduce = useSelector((state: State) => state.pokemon);
  const { loading, pokemon }: { pokemon: TPokemon, loading: boolean } = pokemonReduce;
  const dispatch = useDispatch<AppDispatch>();

  const get = async()=>{
    dispatch(fetchPokemon({ value: name }))
  }  

  // useEffect(()=>{
  //   console.log("Enviando Pokemon para o reduce");
  //   dispatch(setPokemonReduce(pokemon))
  // },[pokemon])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)        
  }

  // useEffect(()=>{
  //   console.log(name);
  // },[name])

  if (loading) {
    return <Typography>Carregando...</Typography>
  }
  return (
    <>
    <TextField
  id="outlined-name"
  label="Name"
  value={name} 
  onChange={handleChange}
/>
    <Typography variant="body2">
      {pokemon?.name}
    </Typography>
    
    {pokemon?.moves?.filter((move)=>move?.version_group_details[0]?.level_learned_at > 0)
      .map((move)=><Typography key={move.move.name}>{move.move.name + ` - ` + move.version_group_details[0].level_learned_at}</Typography>) 
    
    }    
      <Button variant="contained" onClick={get}>Pesquisar</Button>
    </>
  );
}

export default Home;
