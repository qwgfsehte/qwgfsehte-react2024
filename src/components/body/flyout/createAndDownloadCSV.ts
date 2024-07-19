export const createCSV = (selectedItems: string[]) => {
  const rows = selectedItems.map((item, index) => {
    return `${index + 1}. ${item}`;
  });
  return [...rows].join('\n');
};

export const downloadCSV = (csv: string, filename: string) => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.style.visibility = 'hidden';
  link.click();
};
