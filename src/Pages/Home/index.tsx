import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { getPokemon } from "../../services/api";

type TPokemon = {
  name: string
}

function Home() {
  const [pokemon, setPokemon] = useState<TPokemon>({} as TPokemon);

  useEffect(()=>{
    const get = async()=>{
      const response = await getPokemon(11);
      setPokemon(response);
    }
    get();
  },[])

  useEffect(()=>{
    console.log(pokemon);
  },[pokemon])


  return (
    <>
    <Typography variant="body2">
      {pokemon?.name}
    </Typography>
      <Button variant="contained">Pesquisar</Button>
    </>
  );
}

export default Home;
