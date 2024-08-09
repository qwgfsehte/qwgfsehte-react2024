export async function fetchDetailsResults(namePokemon: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
