import { InfoPokemon } from 'src/interfaces/interface';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store';
import { pokemonApi } from '../pokemonAPI';

export default function useDetailsPokemon(name: string) {
  const dispatch = useAppDispatch();

  const [infoPokemon, setInfoPokemon] = useState<
    InfoPokemon | undefined | null
  >(null);

  useEffect(() => {
    if (name) {
      dispatch(pokemonApi.endpoints.fetchPokemonDetails.initiate(name))
        .then(res => {
          setInfoPokemon(res.data);
        })
        .catch(err => {
          console.error('Error fetching Pokemon details:', err);
          setInfoPokemon(null);
        });
    } else {
      setInfoPokemon(null);
    }
  }, [dispatch, name]);

  return {
    infoPokemon,
  };
}
