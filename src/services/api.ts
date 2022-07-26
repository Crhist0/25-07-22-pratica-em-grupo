import axios from "axios";
const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemon = async(value: number | string) =>{
  try{
    const response = await axios.get(`${BASE_URL}/pokemon/${value}`);
    return response.data;
  }catch(err){
    console.log(err);
  }
}
