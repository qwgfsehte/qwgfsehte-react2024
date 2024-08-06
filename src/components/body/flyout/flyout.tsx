import './flyout.scss';
import { createCSV } from './createCSV';
import { useEffect, useRef, useState } from 'react';

// export const ModalWindow: React.FC = () => {
//   const downloadLinkRef = useRef<HTMLAnchorElement>(null);
//   const [csvData, setCsvData] = useState<string | null>(null);
//   const [filename, setFilename] = useState<string | null>(null);

//   // const handleDownload = () => {
//   //   if (selectedItems.length > 0) {
//   //     const csv = createCSV(selectedItems);
//   //     const filename = `${selectedItems.length}_pokemons.csv`;
//   //     setCsvData(csv);
//   //     setFilename(filename);
//   //   }
//   // };

//   useEffect(() => {
//     if (csvData && filename && downloadLinkRef.current) {
//       downloadLinkRef.current.click();
//       setCsvData(null);
//       setFilename(null);
//     }
//   }, [csvData, filename]);

//   const clearSelectedPokemons = () => {
//     dispatch(clearItems([]));
//   };

//   if (selectedItems.length === 0) {
//     return null;
//   }

//   return (
//     <div className="modal-window">
//       <p>{selectedItems.length} items are selected</p>
//       <button onClick={clearSelectedPokemons} className="button-unselect">
//         Unselect all
//       </button>
//       <button onClick={handleDownload} className="button-download">
//         Download
//       </button>
//       {csvData && filename && (
//         <a
//           href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`}
//           download={filename}
//           style={{ display: 'none' }}
//           ref={downloadLinkRef}
//         >
//           Download
//         </a>
//       )}
//     </div>
//   );
// };
