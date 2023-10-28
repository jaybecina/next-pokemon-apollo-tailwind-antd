"use client";
import { useQuery, gql } from "@apollo/client";
import React from "react";

const useGetPokemons = () => {
  const GET_POKEMON = gql`
    query samplePokeAPIquery {
      pokemon_v2_pokemon(limit: 100) {
        name
        pokemon_species_id
        id
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_POKEMON);

  const pokemon = {
    data,
    loading,
    error,
  };

  return pokemon;
};

const useGetOnePokemon = (id: number) => {
  const GET_ONE_POKEMON = gql`
    query samplePokeAPIquery($id: Int!) {
      pokemon_v2_pokemon(limit: 100, where: {id: {_eq: $id}}) {
        name
        pokemon_species_id
        id
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  `;

  const { data, loading, error } = useQuery(GET_ONE_POKEMON, {
    variables: { id },
  });

  const pokemon = {
    data,
    loading,
    error,
  };

  return pokemon;
};

export { 
  useGetPokemons, 
  useGetOnePokemon 
};
