import { Box, TextField, Typography, Paper } from "@mui/material";
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
    <Box className="flex flex-col p-10 justify-center items-center" >
      <TextField 
        className="mb-[10px] " 
        InputProps={{className: 'rounded-full'}}
        id="outlined-name"
        label="Name"
        value={name}
        onChange={handleChange}
      />

      <Button variant="contained" onClick={get}>
        Pesquisar
      </Button>

      <Paper className=" tablet:bg-stone-700 desktop:bg-stone-900 w-full md:w-96 lg:w-64 p-8 mt-6 rounded-md text-center">
        <Typography className="text-[#2E86AB] hover:text-[#226581] mb-8" variant="h3">
          {pokemon?.name}
        </Typography>
        {pokemon?.moves
          ?.filter((move) => move?.version_group_details[0]?.level_learned_at > 0)
          .map((move) => (
            <Typography key={move.move.name}>
              {move.move.name +
                ` - ` +
                move.version_group_details[0].level_learned_at}
            </Typography>
          ))
        }
      </Paper>

    </Box>
  );
}

export default Home;
