import { Link } from 'react-router-dom';
import './uncontrolledFormStyles.scss';
import { schema } from '../../utils/yupSchema';
import { useState } from 'react';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import AutocompleteCountry from '../autocompleteCountry/autocompleteCountry';

interface FormErrors {
  [key: string]: string;
}

function UncontrolledForm() {
  const [formData, setFormData] = useState({
    userName: '',
    userAge: '',
    userEmail: '',
    userPassword: '',
    userPasswordConfirm: '',
    userGender: '',
    userCountry: '',
    userFavoritePicture: null,
    userTnC: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const arrayCountries = useSelector(
    (state: RootState) => state.forms.countries
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = event.target;
    const file = type === 'file' && files ? files[0] : null;

    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? file : value,
    }));
  };

  const selectCountry = (countryName: string) => {
    setFormData(prevData => ({
      ...prevData,
      ['userCountry']: countryName,
    }));
  };

  const submitForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const isValid = await validateForm();
    if (isValid) {
      console.log('Form Data:', formData);
    }
  };

  const validateForm = async () => {
    try {
      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages: FormErrors = {};
        err.inner.forEach(error => {
          if (error.path) {
            errorMessages[error.path] = error.message;
          }
        });
        setErrors(errorMessages);
      }
      return false;
    }
  };

  return (
    <div className="uncontrolled-form-container">
      <Link to={'/home'}>Go to home</Link>
      <form className="uncontrolled-form" onSubmit={submitForm}>
        <div className="uncontrolled-form__item">
          <label htmlFor="userName">Name</label>
          <input
            type="text"
            id="userName"
            onChange={handleChange}
            name="userName"
            className="uncontrolled-form__input"
          />
          <p className="error-message">{errors.userName}</p>
        </div>

        <div className="uncontrolled-form__item">
          <label htmlFor="userAge">Age</label>
          <input
            type="number"
            id="userAge"
            onChange={handleChange}
            name="userAge"
            className="uncontrolled-form__input"
          />
          <p className="error-message">{errors.userAge}</p>
        </div>

        <div className="uncontrolled-form__item">
          <label htmlFor="userEmail">Email</label>
          <input
            type="text"
            id="userEmail"
            onChange={handleChange}
            name="userEmail"
            className="uncontrolled-form__input"
          />
          <p className="error-message">{errors.userEmail}</p>
        </div>

        <div className="uncontrolled-form__item">
          <label htmlFor="userPassword">Password</label>
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            onChange={handleChange}
            className="uncontrolled-form__input"
          />
          <p className="error-message">{errors.userPassword}</p>
        </div>

        <div className="uncontrolled-form__item">
          <label htmlFor="userPasswordConfirm">Password confirm</label>
          <input
            type="password"
            id="userPasswordConfirm"
            name="userPasswordConfirm"
            className="uncontrolled-form__input"
          />
          <p className="error-message">{errors.userPasswordConfirm}</p>
        </div>

        <div className="gender-container">
          <div className="uncontrolled-form__item-gender">
            <p>Gender:</p>
            <input
              type="radio"
              id="male"
              name="userGender"
              value="male"
              onChange={handleChange}
            ></input>
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              id="female"
              name="userGender"
              value="female"
              onChange={handleChange}
            ></input>
            <label htmlFor="female">Female</label>
          </div>
          <p className="error-message">{errors.userGender}</p>
        </div>

        <div className="uncontrolled-form__item">
          <AutocompleteCountry
            allCountries={arrayCountries}
            selectCountry={selectCountry}
          />
          <p className="error-message">{errors.userCountry}</p>
        </div>

        <div className="uncontrolled-form__item">
          <label htmlFor="userFavoritePicture">Favorite picture</label>
          <input
            id="userFavoritePicture"
            type="file"
            name="userFavoritePicture"
          ></input>
        </div>

        <div className="TnC-container">
          <div className="uncontrolled-form__item-TnC">
            <input
              type="checkbox"
              id="userTnC"
              name="userTnC"
              onChange={handleChange}
            ></input>
            <label htmlFor="userTnC">
              I accept Terms and Conditions agreement
            </label>
          </div>
          <p className="error-message">{errors.userTnC}</p>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default UncontrolledForm;
