import React from 'react';
import { PokemonsListProps } from '../../../interfaces/interface';
import Card from '../card/card';

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
