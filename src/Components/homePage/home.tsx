import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import SubmittedForm from '../layoutSubmittedForm/submittedForm';
import { InputsForm } from '../../utils/interfaces';
import './homeStyles.scss';
import { useEffect } from 'react';
import { markAllFormsAsOld } from '../formsSlice.slice';

function Home() {
  const arrayUncontrolledFormUsers = useSelector(
    (state: RootState) => state.forms.uncontrolledFormUsers
  );
  const arrayReactHookFormUsers = useSelector(
    (state: RootState) => state.forms.reactHookFormUsers
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(markAllFormsAsOld());
    }, 5000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="home">
      <nav className="home-nav">
        <Link className="link" to="/uncontrolled-form">
          Uncontrolled Form
        </Link>
        <Link className="link" to="/react-hook-form">
          React Hook Form
        </Link>
      </nav>
      <div className="forms-container">
        {arrayReactHookFormUsers.length === 0 &&
        arrayUncontrolledFormUsers.length === 0 ? (
          <div>It`s empty here for now</div>
        ) : (
          <div className="submitted-container">
            <div className="submitted-uncontrol">
              {arrayUncontrolledFormUsers.map((item: InputsForm, index) => (
                <SubmittedForm
                  key={`${item.userName}-${item.userEmail}-${index}`}
                  form={item}
                  isHighlighted={item.isNew as boolean}
                />
              ))}
            </div>
            <div className="submitted-hook">
              {arrayReactHookFormUsers.map((item: InputsForm, index) => (
                <SubmittedForm
                  key={`${item.userName}-${item.userEmail}-${index}`}
                  form={item}
                  isHighlighted={item.isNew as boolean}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
