import React from 'react';
import { PokemonsListProps } from '../../../interfaces/interface';
import Card from '../card/card';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

function PokemonsList({
  pokemonsList,
  onPokemonClick,
}: PokemonsListProps): React.ReactElement {
  const pokemonPage = useSelector(
    (state: RootState) => state.pokemonSlice.pokemonPage
  );
  console.log(pokemonPage);
  return (
    <>
      {pokemonsList.map((pokemon, index) =>
        pokemon ? (
          <Card key={index} name={pokemon.name} getInfo={onPokemonClick} />
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
