import { createSlice, createAsyncThunk, createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { getPokemon } from "../../../services/api";
import { State } from "../rootReducer";

export type TNewPokemon = {
  name: string,
  url: string
}

type TPokemon = {
  name?: string;
  id: number;
  moves?: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      move_learn_method: {
        name: string;
        url: string;
      };
      version_group: {
        name: string;
        url: string;
      };
    }[];
  }[];
};

const entityAdapter = createEntityAdapter<TNewPokemon>({
  selectId: (pokemon) => pokemon.name,
})

export const { selectAll, selectById } = entityAdapter.getSelectors(
  ({ pokemon }: State) => pokemon.pokemons
);

const initialState: { loading: boolean; pokemon: TPokemon, pokemons: EntityState<TNewPokemon> } = {
  loading: false,
  pokemon: {} as TPokemon,
  pokemons: entityAdapter.getInitialState(),
};

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async ({ value }: { value: string | number }, { dispatch }) => {
    const data = (await getPokemon(value)) as AxiosResponse;

    if (data?.status === 200) {
      return data.data;
    }
    // Forma de rejeitar uma promise
    throw new Error("Deu ruim");
  }
);

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async (_, { dispatch }) => {
    const data = (await getPokemon()) as AxiosResponse;

    if (data?.status === 200) {
      return data.data;
    }
    // Forma de rejeitar uma promise
    throw new Error("Deu ruim");
  }
);

const slice = createSlice({
  name: "getPokemon",
  initialState,
  reducers: {
    setPokemon(state, action) {
      state.pokemon = action.payload;
    },
    updateLoading(state, action) {
      state.loading = action.payload;
    },
    updatePokemonName(state, { payload }){
      state.pokemons = entityAdapter.updateOne(state.pokemons, payload)
    }
  },
  extraReducers: ({ addCase }) => {
    addCase(fetchPokemon.pending, (state) => {
      state.loading = true;
    });
    addCase(fetchPokemon.fulfilled, (state, { payload }) => {
      state.pokemon = payload;
      state.loading = false;
    });
    addCase(fetchPokemon.rejected, (state, action) => {
      state.loading = false;
      console.log(action);

      alert("Deu ruim!");
    });

    addCase(fetchPokemons.fulfilled, (state, { payload }) => {
      state.pokemons = entityAdapter.setAll(state.pokemons, payload.results);
    });
  },
});

export const { setPokemon, updateLoading,updatePokemonName } = slice.actions;
export default slice.reducer;
