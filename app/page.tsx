"use client";
import { useState, useEffect } from "react";
import { Table, Tag, Spin } from "antd";
import { useGetPokemons } from "@/hooks/useGetPokemons";
import Link from "next/link";
import { redirect } from 'next/navigation';
import { usePokeDetailStore } from '../store';

interface IPokemon {
  name: string;
  pokemon_species_id: number;
  id: number;
  pokemon_v2_pokemontypes: {
    pokemon_v2_type: {
      id: number;
      name: string;
    }[];
  }[];
}

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

// in next 13 getServerSideProps, getStaticProps, and getInitialProps are not supported in server components which uses app
// using fetch with cache will be used for getStaticProps thus apollo usequery cache will be used
export default function Home() {
  const [dataSource, setDataSource] = useState<IPokemon[]>([]);

  const pokemonList = useGetPokemons();

  useEffect(() => {
    let mounted = true;

    if (mounted && pokemonList?.data?.pokemon_v2_pokemon?.length > 0) {
      setDataSource(pokemonList?.data?.pokemon_v2_pokemon);
    }

    return () => {
      mounted = false;
    };
  }, [pokemonList]);

  const columns = [
    {
      title: "Image",
      dataIndex: "id",
      key: "id",
      render: (id: number) => (
        <>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt="Pokemon Image"
            width={0}
            height={0}
            style={{ width: 150, height: 100, objectFit: "contain" }}
          />
        </>
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <>
          <strong>{name.toUpperCase()}</strong>
        </>
      ),
    },
    {
      title: "Types",
      dataIndex: "pokemon_v2_pokemontypes",
      key: "pokemon_v2_pokemontypes",
      render: (types: any) => (
        <>
          {types.map((type: any) => (
            <Tag key={type.pokemon_v2_type.id}>{type.pokemon_v2_type.name}</Tag>
          ))}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id: any, name: any, types: any) => (
        <>
          {/* <Button onClick={() => handleOnClick(id, name, types)}>View</Button> */}
          <Link href={`/details/${id}`}>View</Link>
        </>
      ),
    },
  ];

  return (
    <>
      <header className="bg-white mb-4">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Welcome to Pokemon Home Page</h1>
        </div>
      </header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!pokemonList?.loading ?
          <Table
            loading={pokemonList?.loading}
            columns={columns}
            dataSource={dataSource}
            size="large"
          />
        :
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        }
      </div>
    </>
  );
}
