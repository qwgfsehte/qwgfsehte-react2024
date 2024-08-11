export async function fetchSearchResults() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=2000`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data;
}
