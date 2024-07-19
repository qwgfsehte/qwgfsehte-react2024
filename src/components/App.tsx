import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PokemonDetailsContainer from './body/pokemonDetails/pokemonDetailsContainer';
import ErrorPage404 from './errorPage/pageError404';
import { AppContent } from './App/appLayout';
import { Provider } from 'react-redux';
import store from './store';

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/search/page/1" />} />
          <Route path="/search" element={<Navigate to="/search/page/1" />} />
          <Route path="/search/page/:page" element={<AppContent />}>
            <Route path="details/:name" element={<PokemonDetailsContainer />} />
          </Route>
          <Route path="*" element={<ErrorPage404 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
