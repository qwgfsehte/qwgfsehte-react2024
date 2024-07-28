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
