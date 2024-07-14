import React from 'react';
import { PokemonsListContainerProps } from '../../../interfaces/interface';
import PokemonsList from './pokemonsList';

const PokemonsListContainer: React.FC<PokemonsListContainerProps> = ({
  pokemonData,
  selectedPokemon,
  handlePokemonClick,
}) => {
  return (
    <>
      <div
        className={
          selectedPokemon ? 'pokemons-list half-width' : 'pokemons-list'
        }
      >
        <PokemonsList
          pokemonsList={pokemonData}
          onPokemonClick={handlePokemonClick}
        />
      </div>
    </>
  );
};

export default PokemonsListContainer;
