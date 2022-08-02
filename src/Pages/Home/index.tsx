import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../../services/api";
import { AppDispatch } from "../../store";
import {
  fetchPokemon,
  updateLoading,
} from "../../store/modules/pokemon/pokemonSlice";
import { State } from "../../store/modules/rootReducer";

function Home() {
  // const [pokemon, setPokemon] = useState<TPokemon>({});
  const [name, setName] = useState<string | number>("");
  const { pokemon, loading } = useSelector((state: State) => state.pokemon);
  const dispatch = useDispatch<AppDispatch>();

  const get = () => {
    dispatch(fetchPokemon({ value: name }));
  };

  // useEffect(() => {

  // }, [pokemon]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  if (loading) {
    return <Typography>Buscando dados da API</Typography>;
  }

  return (
    <>
      <TextField
        id="outlined-name"
        label="Name"
        value={name}
        onChange={handleChange}
      />
      <Typography variant="body2">{pokemon?.name}</Typography>

      {pokemon?.moves
        ?.filter((move) => move?.version_group_details[0]?.level_learned_at > 0)
        .map((move) => (
          <Typography key={move.move.name}>
            {move.move.name +
              ` - ` +
              move.version_group_details[0].level_learned_at}
          </Typography>
        ))}
      <Button variant="contained" onClick={get}>
        Pesquisar
      </Button>
    </>
  );
}

export default Home;
