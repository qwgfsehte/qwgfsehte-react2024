import React from 'react';
import Card from './card';
import { PokemonsListProps } from '../../interfaces/interface';

function PokemonsList({ pokemonsList }: PokemonsListProps): React.ReactElement {
  return (
    <div className="pokemons-list">
      {pokemonsList.map((pokemon, index) => (
        <Card key={index} data={pokemon} />
      ))}
    </div>
  );
}

export default PokemonsList;
