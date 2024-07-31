import { useDispatch, useSelector } from 'react-redux';
import styles from './flyout.module.scss';
import { createCSV } from './createCSV';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '../../store';
import { clearItems } from '../pokemonsList/pokemonList.slice';

export const ModalWindow: React.FC = () => {
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const [csvData, setCsvData] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);

  const selectedItems = useSelector(
    (state: RootState) => state.pokemonListSlice.selectedPokemons
  );
  const dispatch = useDispatch();

  const handleDownload = () => {
    if (selectedItems.length > 0) {
      const csv = createCSV(selectedItems);
      const filename = `${selectedItems.length}_pokemons.csv`;
      setCsvData(csv);
      setFilename(filename);
    }
  };

  useEffect(() => {
    if (csvData && filename && downloadLinkRef.current) {
      downloadLinkRef.current.click();
      setCsvData(null);
      setFilename(null);
    }
  }, [csvData, filename]);

  const clearSelectedPokemons = () => {
    dispatch(clearItems([]));
  };

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className={styles['modal-window']}>
      <p>{selectedItems.length} items are selected</p>
      <button
        onClick={clearSelectedPokemons}
        className={styles['button-unselect']}
      >
        Unselect all
      </button>
      <button onClick={handleDownload} className={styles['button-download']}>
        Download
      </button>
      {csvData && filename && (
        <a
          href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`}
          download={filename}
          style={{ display: 'none' }}
          ref={downloadLinkRef}
        >
          Download
        </a>
      )}
    </div>
  );
};
