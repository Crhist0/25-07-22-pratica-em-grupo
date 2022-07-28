import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getPokemon } from "../../../services/api";



const initialState = {
    loading: false,
    pokemon: {},
};

export const fetchPokemon = createAsyncThunk(
    'pokemon/fetchPokemon',
    async ({value}: {value: string|number},{ dispatch }) => {
        const data = await getPokemon(value)
        return data;
    }
)

const slice = createSlice({
    name: 'getPokemon',
    initialState,
    reducers: {
        setPokemon(state, action){
            state.pokemon = action.payload;
        },
        updateLoading(state, action){
            
        }
    },
    extraReducers: ({ addCase }) => {
        addCase(fetchPokemon.pending, (state, { payload }) => {
            state.loading = true;
        });
        addCase(fetchPokemon.fulfilled, (state, { payload }) => {
            state.pokemon = payload;
        })
    },
})

export const { setPokemon } = slice.actions;
export default slice.reducer;