import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import Home from './homePage/home';
import UncontrolledForm from './uncontrolledForm/uncontrolledForm';
import ReactHookForm from './reactHookForm/reactHookForm';
import ErrorPage404 from './errorPage/errorPage404';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/uncontrolled-form">Uncontrolled Form</Link>
          </li>
          <li>
            <Link to="/react-hook-form">React Hook Form</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
        <Route path="/react-hook-form" element={<ReactHookForm />} />
        <Route path="*" element={<ErrorPage404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
