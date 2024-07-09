import React from 'react';
import Card from './card';
import { PokemonsListProps } from '../../interfaces/interface';

function PokemonsList({
  pokemonsList,
  onPokemonClick,
}: PokemonsListProps): React.ReactElement {
  return (
    <>
      {pokemonsList.map((pokemon, index) => (
        <Card key={index} data={pokemon} getInfo={onPokemonClick} />
      ))}
    </>
  );
}

export default PokemonsList;
