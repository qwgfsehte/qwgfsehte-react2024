'use client';
import styles from './pokemonList.module.scss';
import { Pokeball } from './pokeball';
import { filterPokemons } from '../../hooks/useFilterPokemons';
import { MainProps, PokemonCardInfo } from 'src/interfaces/interface';
import Link from 'next/link';
import { useCookie } from '../../../Components/hooks/useCookie';
import { ChangeEvent, useEffect, useState } from 'react';
import { ModalWindow } from '../flyout/flyout';
import Cookies from 'js-cookie';
import stylesTheme from '../../context/theme.module.scss';
import { useToggleTheme } from '../../context/useContext';

function PokemonsList({
  allPokemons,
  currentPage,
}: MainProps): React.ReactElement {
  const { isDark } = useToggleTheme();
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
    <div className={styles['pokemons-list']}>
      {filterPokemons(allPokemons, currentPage, storedValue).map(
        (pokemon, index) =>
          pokemon ? (
            <div key={index} className={`${styles['card-container']}`}>
              <input
                data-testid={`checkbox-${(pokemon as PokemonCardInfo).name}-${index}`}
                id={
                  (pokemon as PokemonCardInfo).name +
                  ' - ' +
                  (pokemon as PokemonCardInfo).url
                }
                className={`${styles['pokemon-select']} ${isDark ? stylesTheme['dark-pokemon-select'] : ''}`}
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={items?.includes(
                  (pokemon as PokemonCardInfo).name +
                    ' - ' +
                    (pokemon as PokemonCardInfo).url
                )}
              ></input>
              <Link
                className={`${styles['card']} ${isDark ? stylesTheme['dark-card'] : ''}`}
                href={`/search/page/${currentPage}/details/${(pokemon as PokemonCardInfo).name}`}
              >
                <Pokeball />
                <h3 className={styles['card-name']}>
                  {(pokemon as PokemonCardInfo).name.charAt(0).toUpperCase() +
                    (pokemon as PokemonCardInfo).name.slice(1)}
                </h3>
              </Link>
            </div>
          ) : (
            <div key={index} className={styles['placeholder']}>
              pokemon not found
            </div>
          )
      )}
      <ModalWindow selectedItems={items} clearItems={clearItems} />
    </div>
  );
}

export default PokemonsList;
