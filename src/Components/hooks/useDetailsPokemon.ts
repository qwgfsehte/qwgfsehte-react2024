import { InfoPokemon } from 'src/interfaces/interface';
import { useEffect, useState } from 'react';
import store, { useAppDispatch } from '../store';
import { pokemonApi } from '../pokemonAPI';

export default function useDetailsPokemon(name: string) {
  const dispatch = useAppDispatch();
  const [infoPokemon, setInfoPokemon] = useState<
    InfoPokemon | undefined | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (name) {
      const fetchPokemonDetails = async () => {
        setLoading(true);
        try {
          const result = await store.dispatch(
            pokemonApi.endpoints.fetchPokemonDetails.initiate(name)
          );
          setInfoPokemon(result.data);
        } catch (err) {
          console.error('Error fetching Pokemon details:', err);
          setInfoPokemon(null);
        } finally {
          setLoading(false);
        }
      };

      fetchPokemonDetails();
    } else {
      setInfoPokemon(null);
    }
  }, [dispatch, name]);

  return { infoPokemon, loading };
}
