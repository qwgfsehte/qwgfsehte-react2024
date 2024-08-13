import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';

function Home() {
  const arrayUsers = useSelector(
    (state: RootState) => state.forms.uncontrolledFormUsers
  );

  return (
    <nav>
      <ul>
        <li>
          <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        </li>
        <li>
          <Link to="/react-hook-form">React Hook Form</Link>
        </li>
        {arrayUsers.map(item => (
          <div key={item.name}>
            <img src={item.userFavoritePicture} alt="" />
          </div>
        ))}
      </ul>
    </nav>
  );
}

export default Home;
