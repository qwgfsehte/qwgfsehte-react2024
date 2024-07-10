import { PokemonDetailsContainerProps } from '../../interfaces/interface';
import { PokemonDetailsInfo } from './pokemonDetailsInfo';

const PokemonDetailsContainer: React.FC<PokemonDetailsContainerProps> = ({
  selectedPokemon,
  closePokemonDetails,
}) =>
  selectedPokemon ? (
    <div className="pokemon-details">
      <PokemonDetailsInfo
        data={selectedPokemon}
        onClose={closePokemonDetails}
      />
    </div>
  ) : null;

export default PokemonDetailsContainer;
