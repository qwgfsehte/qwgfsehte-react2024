const FIRST_LETTER_INDEX = 0;
const SECOND_LETTER_INDEX = 1;

export function updateFirstLetterToUpperCase(namePokemon: string) {
  return (
    namePokemon[FIRST_LETTER_INDEX].toUpperCase() +
    namePokemon.slice(SECOND_LETTER_INDEX, namePokemon.length)
  );
}

export function chunkArray(
  array: { name: string; url: string }[],
  chunkSize = 20
) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
