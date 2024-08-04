'use client';
import styles from './flyout.module.scss';
import { createCSV } from './createCSV';
import { useEffect, useRef, useState } from 'react';
import { useToggleTheme } from '../../../Components/context/useContext';
import stylesTheme from '../../context/theme.module.scss';

interface ModalProps {
  selectedItems: string[];
  clearItems: () => void;
}

export const ModalWindow: React.FC<ModalProps> = ({
  selectedItems,
  clearItems,
}) => {
  const { isDark } = useToggleTheme();
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const [csvData, setCsvData] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);

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

  if (selectedItems.length === 0) {
    return null;
  }
  return (
    <div
      className={`${styles['modal-window']} ${isDark ? stylesTheme['dark-modal-window'] : ''}`}
    >
      <p>{selectedItems.length} items are selected</p>
      <button className={styles['button-unselect']} onClick={clearItems}>
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
