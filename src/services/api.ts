import axios, { AxiosError, AxiosResponse } from "axios";
const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemon = async (value?: number | string) => {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${value ? value : ''}`);
    return response;
  } catch (err: any) {
    return err.response as AxiosResponse;
  }
};
