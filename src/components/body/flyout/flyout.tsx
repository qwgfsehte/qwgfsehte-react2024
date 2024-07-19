import { useDispatch, useSelector } from 'react-redux';
import './flyout.scss';
import { RootState } from '../../store';
import { clearItems } from '../pokemonsList/pokemonList.slice';
import { createCSV, downloadCSV } from './createAndDownloadCSV';

export function ModalWindow() {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.pokemonListSlice.selectedPokemons
  );

  const handleDownload = () => {
    if (selectedItems.length > 0) {
      const csv = createCSV(selectedItems);
      const filename = `${selectedItems.length}_pokemons.csv`;
      downloadCSV(csv, filename);
    }
  };

  const clearSelectedPokemons = () => {
    dispatch(clearItems([]));
  };

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div className="modal-window">
      <p>{selectedItems.length} items are selected</p>
      <button onClick={clearSelectedPokemons} className="button-unselect">
        Unselect all
      </button>
      <button onClick={handleDownload} className="button-download">
        Download
      </button>
    </div>
  );
}
