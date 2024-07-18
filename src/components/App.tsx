import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PokemonDetailsContainer from './body/pokemonDetails/pokemonDetailsContainer';
import ErrorPage404 from './errorPage/pageError404';
import { AppContent } from './App/appLayout';

export function App() {
  return (
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
  );
}
