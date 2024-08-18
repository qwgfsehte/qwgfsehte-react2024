import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './homePage/home';
import UncontrolledForm from './uncontrolledForm/uncontrolledForm';
import ReactHookForm from './reactHookForm/reactHookForm';
import ErrorPage404 from './errorPage/errorPage404';
import '../styles/global.scss';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
          <Route path="/react-hook-form" element={<ReactHookForm />} />
          <Route path="*" element={<ErrorPage404 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
