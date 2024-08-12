import { Link } from 'react-router-dom';

function Home() {
  return (
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
  );
}

export default Home;
