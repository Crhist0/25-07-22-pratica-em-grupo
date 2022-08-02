import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { getPokemon } from "../../../services/api";

type TPokemon = {
  name?: string;
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

const initialState: { loading: boolean; pokemon: TPokemon } = {
  loading: false,
  pokemon: {},
};

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async ({ value }: { value: string | number }, { dispatch }) => {
    const data = (await getPokemon(value)) as AxiosResponse;

    if (data?.status == 200) {
      return data.data;
    }
    // Forma de rejeitar uma promisse
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
  },
});

export const { setPokemon, updateLoading } = slice.actions;
export default slice.reducer;
