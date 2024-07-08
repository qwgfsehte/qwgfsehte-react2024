const FIRST_LETTER_INDEX = 0;
const SECOND_LETTER_INDEX = 1;

export function updateFirstLetterToUpperCase(namePoremon: string) {
  return (
    namePoremon[FIRST_LETTER_INDEX].toUpperCase() +
    namePoremon.slice(SECOND_LETTER_INDEX, namePoremon.length)
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
