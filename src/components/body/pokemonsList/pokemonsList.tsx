import './pokemonList.scss';
import { Pokeball } from './pokeball';
import { AppProps, PokemonCardInfo } from '../../../interfaces/interface';
import { filterPokemons } from '../../hooks/useFilterPokemons';
import { Link, useNavigation } from '@remix-run/react';
import { ChangeEvent, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ModalWindow } from '../flyout/flyout';
import ErrorMessage from '../../errorMessage/errorMessage';
import Loading from '../../loading/loading';

function PokemonsList({
  allPokemons,
  currentPage,
}: AppProps): React.ReactElement {
  const [storedValue, setStoredValue] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const savedItems = Cookies.get('selectedPokemons');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    const savedValue = Cookies.get('searchValueInput');
    if (savedValue) {
      setStoredValue(savedValue);
    }

    const interval = setInterval(() => {
      const newValue = Cookies.get('searchValueInput');
      if (newValue !== storedValue) {
        setStoredValue(newValue as string);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [storedValue]);

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
    <>
      {navigation.state === 'loading' && <Loading />}
      {navigation.state !== 'loading' &&
        filterPokemons(allPokemons, currentPage, storedValue).length === 0 && (
          <ErrorMessage />
        )}
      {navigation.state !== 'loading' &&
        filterPokemons(allPokemons, currentPage, storedValue).length !== 0 && (
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
                    Pokemon not found
                  </div>
                )
            )}
            <ModalWindow selectedItems={items} clearItems={clearItems} />
          </div>
        )}
    </>
  );
}

export default PokemonsList;
