import './pokemonList.scss';
import { Pokeball } from './pokeball';
import { AppProps, PokemonCardInfo } from '../../../interfaces/interface';
import { filterPokemons } from '../../hooks/useFilterPokemons';
import { Link } from '@remix-run/react';
import { useCookie } from '../../hooks/useCookies';
import { ChangeEvent, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ModalWindow } from '../flyout/flyout';

function PokemonsList({
  allPokemons,
  currentPage,
}: AppProps): React.ReactElement {
  const [storedValue] = useCookie('searchValueInput');
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const savedItems = Cookies.get('selectedPokemons');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;

    setItems(prevItems => {
      const updatedItems = checked
        ? [...prevItems, id]
        : prevItems.filter(item => item !== id);

      Cookies.set('selectedPokemons', JSON.stringify(updatedItems), {
        expires: 7,
      });

      return updatedItems;
    });
  };

  const clearItems = () => {
    setItems([]);
    Cookies.set('selectedPokemons', JSON.stringify([]), {
      expires: 7,
    });
  };

  return (
    <div className={'pokemons-list'}>
      {filterPokemons(allPokemons, currentPage, storedValue).map(
        (pokemon, index) =>
          pokemon ? (
            <div key={index} className="card-container">
              <input
                data-testid={`checkbox-${(pokemon as PokemonCardInfo).name}-${index}`}
                id={
                  (pokemon as PokemonCardInfo).name +
                  ' - ' +
                  (pokemon as PokemonCardInfo).url
                }
                className="pokemon-select"
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={items?.includes(
                  (pokemon as PokemonCardInfo).name +
                    ' - ' +
                    (pokemon as PokemonCardInfo).url
                )}
              ></input>
              <Link
                key={index}
                className="card"
                to={`/search/page/${currentPage}/details/${(pokemon as PokemonCardInfo).name}`}
              >
                <Pokeball />
                <h3 className="pokemon-name">
                  {(pokemon as PokemonCardInfo).name}
                </h3>
              </Link>
            </div>
          ) : (
            <div key={index} className="placeholder">
              pokemon not found
            </div>
          )
      )}
      <ModalWindow selectedItems={items} clearItems={clearItems} />
    </div>
  );
}

export default PokemonsList;
