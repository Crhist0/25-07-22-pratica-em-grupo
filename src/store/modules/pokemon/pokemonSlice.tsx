import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const slice = createSlice({
    name: 'getPokemon',
    initialState,
    reducers: {
        setPokemon(state, action){
            return action.payload;
        }
    }
})

export const { setPokemon } = slice.actions;
export default slice.reducer;