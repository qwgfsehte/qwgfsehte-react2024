'use client';
import Link from 'next/link';
import PokemonsList from '../body/pokemonsList/pokemonsList';
import { Pagination } from '../pagination/pagination';
import styles from './app.module.scss';
import { PokemonCardInfo } from 'src/interfaces/interface';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

interface AppProps {
  allPokemons: PokemonCardInfo[];
  currentPage: number;
}

export function AppContent({ allPokemons, currentPage }: AppProps) {
  const [storedValue, setStoredValue] = useState<string>('');

  useEffect(() => {
    const cookieValue = Cookies.get('searchValueInput') || '';
    setStoredValue(cookieValue);

    const interval = setInterval(() => {
      const newValue = Cookies.get('searchValueInput') || '';
      if (newValue !== storedValue) {
        setStoredValue(newValue);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [storedValue]);

  return (
    <div>
      <Link
        className={styles['shadow-button']}
        href={`/search/page/${currentPage}`}
      ></Link>
      <div className={styles['pokemons-container']}>
        <PokemonsList
          allPokemons={allPokemons}
          currentPage={currentPage}
          storedValue={storedValue}
        />
      </div>
      <Pagination
        allPokemons={allPokemons}
        currentPage={currentPage}
        storedValue={storedValue}
      />
      {/* <ModalWindow /> */}
    </div>
  );
}
