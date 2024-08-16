import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import SubmittedForm from '../layoutSubmittedForm/submittedForm';
import { InputsForm } from '../../utils/interfaces';

function Home() {
  const arrayUncontrolledFormUsers = useSelector(
    (state: RootState) => state.forms.uncontrolledFormUsers
  );
  const arrayReactHookFormUsers = useSelector(
    (state: RootState) => state.forms.reactHookFormUsers
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
        {arrayUncontrolledFormUsers.map((item: InputsForm) => (
          <SubmittedForm key={item.userName} form={item} />
        ))}
        {arrayReactHookFormUsers.map((item: InputsForm) => (
          <SubmittedForm key={item.userName} form={item} />
        ))}
      </ul>
    </nav>
  );
}

export default Home;
