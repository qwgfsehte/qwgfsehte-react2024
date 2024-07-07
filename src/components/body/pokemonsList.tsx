import React from 'react';
import Card from './card';
import { PokemonsListProps } from '../../interfaces/interface';

class PokemonsList extends React.Component<PokemonsListProps> {
  render() {
    return (
      <div className="pokemons-list">
        {this.props.pokemonList.map((pokemon, index) => (
          <Card key={index} data={pokemon} />
        ))}
      </div>
    );
  }
}

export default PokemonsList;
