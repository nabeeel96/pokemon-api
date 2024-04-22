'use client'
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";
import PokemonList from "../../../components/PokemonList";
import { fetchPokemonsByCategories } from "../../../utils/fetch";
import LoadingSpinner from "../../../components/LoadingSpinner";
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;
const SearchInput = styled.input`
  float: right;
  width: 25rem;
  height: 50px;
  border-radius: 20px;
  background: white;
  color: black;
  padding: 20px;
  font-size: 1.3rem;
`;

const Category = () => {
    const { name } = useParams();
    const [pokemonData, setPokemonData] = useState(null);
    const [searchVal, setSearchVal] = useState('');

    const { data, isLoading, error } = useQuery(["types", name], () =>
        fetchPokemonsByCategories([name])
    );

    useEffect(() => {
        setPokemonData(data);
    }, [data]);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div>Error: {error.message}</div>;

    const handleSearchChange = (event) => {
        setSearchVal(event.target.value);
    };

    const filteredPokemonData = pokemonData?.pokemon.filter(pokemon => pokemon.pokemon.name.toLowerCase().includes(searchVal.toLowerCase()));

    return (
        <div>
            <SearchInput onChange={handleSearchChange} placeholder="Search Pokemon..." />
            <Title >{name} Pokemons</Title>
            <PokemonList pokemons={filteredPokemonData || pokemonData?.pokemon} />
        </div>
    );
};

export default Category;
