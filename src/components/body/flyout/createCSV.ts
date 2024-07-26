export const createCSV = (selectedItems: string[]) => {
  const rows = selectedItems.map((item, index) => {
    return `${index + 1}. ${item}`;
  });
  return [...rows].join('\n');
};
