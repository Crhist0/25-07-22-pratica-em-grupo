import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { getPokemon } from "../../services/api";

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
  const [name, setName] = useState<string | number>("")

  const get = async()=>{
    const response = await getPokemon(name);
    setPokemon(response);
  }  

  useEffect(()=>{
    console.log(pokemon);
  },[pokemon])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)        
  }

  useEffect(()=>{
    console.log(name);
  },[name])

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
      .map((move)=><Typography>{move.move.name + ` - ` + move.version_group_details[0].level_learned_at}</Typography>) 
    
    }    
      <Button variant="contained" onClick={get}>Pesquisar</Button>
    </>
  );
}

export default Home;
