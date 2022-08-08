import { Box, TextField, Typography, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  fetchPokemon,
  fetchPokemons,
  selectAll,
  updatePokemonName,
} from "../../store/modules/pokemon/pokemonSlice";
import { State } from "../../store/modules/rootReducer";

function Home() {
  const [name, setName] = useState<string | number>("");
  const [newName, setNewName] = useState<string>("");
  const [selectedPokemon, setSelectedPokemon] = useState<number>(1);
  const { pokemon, loading } = useSelector((state: State) => state.pokemon);
  const pokemons = useSelector(selectAll);
  const dispatch = useDispatch<AppDispatch>();

  const get = () => {
    if (name) {
      return dispatch(fetchPokemon({ value: name }));
    }
    dispatch(fetchPokemons());
  };

  const update = () => {
    dispatch(
      updatePokemonName({
        id: selectedPokemon,
        changes: {
          name: newName,
          moves: [{ name: "AAAA", url: "URL" }],
          bolinha: [],
        },
      })
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  if (loading) {
    return <Typography>Buscando dados da API</Typography>;
  }

  return (
    <Box className="flex flex-col p-10 justify-center items-center">
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            className="mb-[10px] "
            InputProps={{ className: "rounded-full" }}
            id="outlined-name"
            label="Buscar"
            value={name}
            onChange={handleChange}
          />

          <Button variant="contained" onClick={get}>
            Pesquisar
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            className="mb-[10px] "
            InputProps={{ className: "rounded-full" }}
            id="outlined-name"
            label="Atualizar"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button variant="contained" onClick={update}>
            atualizar
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Typography variant="h6">Pokemon Selecionado</Typography>
          <Typography textAlign="center">{selectedPokemon}</Typography>
        </Box>
      </Box>

      <Paper className=" tablet:bg-stone-700 desktop:bg-stone-900 w-full md:w-96 lg:w-64 p-8 mt-6 rounded-md text-center">
        <Typography
          className="text-[#2E86AB] hover:text-[#226581] mb-8"
          variant="h3"
        >
          {pokemon?.name}
        </Typography>
        {pokemon?.moves
          ?.filter(
            (move) => move?.version_group_details[0]?.level_learned_at > 0
          )
          .map((move) => (
            <Typography key={move.move.name}>
              {move.move.name +
                ` - ` +
                move.version_group_details[0].level_learned_at}
            </Typography>
          ))}
      </Paper>

      {pokemons &&
        pokemons.map((pokemon) => {
          return (
            <Typography
              variant="body1"
              sx={{ cursor: "pointer" }}
              className="hover:text-[#F00]"
              key={pokemon.id}
              onClick={() => setSelectedPokemon(pokemon.id)}
            >
              {pokemon.name}
            </Typography>
          );
        })}
    </Box>
  );
}

export default Home;
