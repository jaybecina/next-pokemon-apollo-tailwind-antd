import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware';

// Define the interface IPokeDetails
interface IPokeDetails {
  name: string;
  id: number;
  types: {
    pokemon_v2_type: {
      id: number;
      name: string;
    }[];
  }[];
}

const useStore = create((set) => ({
  pokeDetails: null as IPokeDetails | null, // Initial state is null

  setPokeDetails: (pokeDetails: IPokeDetails) => {
    set({ pokeDetails });
  },

  clearPokeDetails: () => {
    set({ pokeDetails: null });
  },
}));

export const usePokeDetailStore = useStore;