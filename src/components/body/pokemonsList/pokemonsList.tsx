import React from 'react';
import { PokemonsListProps } from '../../../interfaces/interface';
import Card from '../card/card';

function PokemonsList({
  pokemonsList,
  onPokemonClick,
}: PokemonsListProps): React.ReactElement {
  return (
    <>
      {pokemonsList.map((pokemon, index) =>
        pokemon ? (
          <Card key={index} data={pokemon} getInfo={onPokemonClick} />
        ) : (
          <div key={index} className="placeholder">
            pokemon not found
          </div>
        )
      )}
    </>
  );
}

export default PokemonsList;
