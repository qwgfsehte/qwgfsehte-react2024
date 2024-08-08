import { describe, afterEach, expect, test } from 'vitest';
import fetchMock from 'fetch-mock';
import { fetchSearchResults } from '../app/api/fetchAllPokemons';
import { fetchDetailsResults } from '../app/api/fetchDetailsPokemon';

describe('fetchSearchResults', () => {
  const mockDataDetails = {
    name: 'pikachu',
    sprites: { front_default: 'pikachu.png' },
    types: [{ type: { name: 'electric' } }],
    cries: { latest: 'latest.mp3', legacy: 'legacy.mp3' },
    weight: 60,
    height: 4,
    abilities: [{ ability: { name: 'static' } }],
    stats: [{ stat: { name: 'speed' }, base_stat: 90 }],
    id: '1',
  };
  const mockName = 'pikachu';
  const mockData = {
    results: [
      { name: 'bulbasaur', url: 'test' },
      { name: 'charmander', url: 'test' },
    ],
  };

  afterEach(() => {
    fetchMock.restore();
  });

  test('return data when fetch is successful', async () => {
    fetchMock.getOnce('https://pokeapi.co/api/v2/pokemon?limit=2000', {
      body: mockData,
      headers: { 'content-type': 'application/json' },
    });

    const data = await fetchSearchResults();
    expect(data).toEqual(mockData);
  });

  test('error when fetch fails', async () => {
    fetchMock.getOnce('https://pokeapi.co/api/v2/pokemon?limit=2000', 500);

    await expect(fetchSearchResults()).rejects.toThrow('Failed to fetch data');
  });

  test('return data when fetch details pokemon is successful', async () => {
    fetchMock.getOnce(`https://pokeapi.co/api/v2/pokemon/${mockName}`, {
      body: mockDataDetails,
      headers: { 'content-type': 'application/json' },
    });

    const data = await fetchDetailsResults(mockName);
    expect(data).toEqual(mockDataDetails);
  });

  test('error when fetch details pokemon fails', async () => {
    fetchMock.getOnce(`https://pokeapi.co/api/v2/pokemon/${mockName}`, 500);

    await expect(fetchDetailsResults(mockName)).rejects.toThrow(
      'Failed to fetch data'
    );
  });
});
