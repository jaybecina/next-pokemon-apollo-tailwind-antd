"use client";
import React, { useState, useEffect } from "react";
import { Spin, Divider, Button } from "antd";
import { useGetOnePokemon } from "@/hooks/useGetPokemons";
import styles from '../../styles/details/styles.module.css'

interface IPokemonType {
  __typename: string;
  pokemon_v2_type: {
      __typename: string;
      name: string;
  };
}

interface IPokemon {
  __typename: string;
  name: string;
  pokemon_species_id: number;
  id: number;
  pokemon_v2_pokemontypes: IPokemonType[];
}

const Details = ({
  params,
  searchParams,
}: {
  params: { slug: string; id: number };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const id_str = params.id.toString(); // Convert 'params.id' to a string
  const id_int = parseInt(id_str, 10);
  const pokemonDetail = useGetOnePokemon(id_int);
  // console.log(pokemonDetail);

  const [dataSource, setDataSource] = useState<IPokemon[]>([]);

  useEffect(() => {
    let mounted = true;

    if (mounted && pokemonDetail?.data?.pokemon_v2_pokemon?.length > 0) {
      setDataSource(pokemonDetail?.data?.pokemon_v2_pokemon);
    }

    return () => {
      mounted = false;
    };
  }, [pokemonDetail]);

  useEffect(() => {
    console.log("dataSource: ", dataSource[0])
  }, [dataSource])
  
  return (
    <div className={styles.bgContainer}>
      <header className="bg-white mb-4">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Pokemon Detail Page</h1>
          <div className="relative lg:absolute lg:left-[30px]">
            <Button href="/" className="w-[100px] px-[20px] py-[5px] top-[10px] lg:top-[-40px] bg-blue-500 text-white">Back</Button>
          </div>
        </div>
      </header>
      {!pokemonDetail?.loading ?
        <>
          <h1 className="font-bold text-6xl text-center text-white my-4">{dataSource[0]?.name?.toUpperCase()}</h1>
          <Divider className="my-10"/>
          <div className="flex justify-center">
            <div className="rounded-full bg-slate-200 w-[400px] h-[400px] group relative">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dataSource[0]?.id}.png`}
                alt="Pokemon Image"
                width={0}
                height={0}
                style={{ width: 400, height: 400, objectFit: "cover" }}
                className="transition-transform transform scale-100 group-hover:scale-110"
              />
            </div>
          </div>
          <Divider className="my-10"/>
          <div className="p-4 flex justify-center">
            <div className="p-4 bg-white">
              <div className="flex mb-3">
                <h3 className="font-bold text-lg text-left mr-3">Pokemon Number:</h3>
                <h3 className="font-bold text-lg text-left">{dataSource[0]?.id}</h3>
              </div>

              <div className="flex">
                <h3 className="font-bold text-lg text-left mr-3">Pokemon Types:</h3>
                {dataSource[0]?.pokemon_v2_pokemontypes?.map((item: any, i: number) => (
                  <h3 className="font-bold text-lg text-left">{item?.pokemon_v2_type?.name?.toUpperCase()
                  }{dataSource[0]?.pokemon_v2_pokemontypes?.length > 0 && dataSource[0]?.pokemon_v2_pokemontypes?.length - 1 !== i ? <span className="mr-2">, </span> : " "}</h3>
                ))}
              </div>
            </div>
          </div>
        </>
      :
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      }
    </div>
  );
};

export default Details;
