import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../store';
import SubmittedForm from '../layoutSubmittedForm/submittedForm';
import { InputsForm } from '../../utils/interfaces';
import './homeStyles.scss';
import { useEffect, useState } from 'react';

function Home() {
  const arrayUncontrolledFormUsers = useSelector(
    (state: RootState) => state.forms.uncontrolledFormUsers
  );
  const arrayReactHookFormUsers = useSelector(
    (state: RootState) => state.forms.reactHookFormUsers
  );

  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [highlightedFormType, setHighlightedFormType] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (highlightIndex !== null) {
      const timer = setTimeout(() => {
        setHighlightIndex(null);
        setHighlightedFormType(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [highlightIndex]);

  useEffect(() => {
    if (arrayUncontrolledFormUsers.length > 0) {
      setHighlightedFormType('uncontrolled');
      setHighlightIndex(arrayUncontrolledFormUsers.length - 1);
    } else if (arrayReactHookFormUsers.length > 0) {
      setHighlightedFormType('hook');
      setHighlightIndex(arrayReactHookFormUsers.length - 1);
    }
  }, [arrayUncontrolledFormUsers, arrayReactHookFormUsers]);

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
          <>
            <div className="submitted-uncontrol">
              {arrayUncontrolledFormUsers.map((item: InputsForm, index) => (
                <SubmittedForm
                  key={`${item.userName}-${item.userEmail}-${index}`}
                  form={item}
                  isHighlighted={
                    highlightIndex === index &&
                    highlightedFormType === 'uncontrolled'
                  }
                />
              ))}
            </div>
            <div className="submitted-hook">
              {arrayReactHookFormUsers.map((item: InputsForm, index) => (
                <SubmittedForm
                  key={`${item.userName}-${item.userEmail}-${index}`}
                  form={item}
                  isHighlighted={
                    highlightIndex === index && highlightedFormType === 'hook'
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
