import { combineReducers } from '@reduxjs/toolkit';
import pokemon from './pokemon/pokemonSlice';

const reducers = combineReducers({
    pokemon
});

export default reducers;
export type State = ReturnType<typeof reducers>;