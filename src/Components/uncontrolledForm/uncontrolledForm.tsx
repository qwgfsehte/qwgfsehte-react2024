import { Link, useNavigate } from 'react-router-dom';
import './uncontrolledFormStyles.scss';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import AutocompleteCountry from '../autocompleteCountry/autocompleteCountry';
import { createValidationSchema } from '../../utils/yupSchema';
import { setUncontrolledFormUser } from '../formsSlice.slice';
import { convertImageToBase64 } from '../../utils/convertImage';

interface FormErrors {
  [key: string]: string;
}

function UncontrolledForm() {
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const userAgeRef = useRef<HTMLInputElement | null>(null);
  const userEmailRef = useRef<HTMLInputElement | null>(null);
  const userPasswordRef = useRef<HTMLInputElement | null>(null);
  const userPasswordConfirmRef = useRef<HTMLInputElement | null>(null);
  const userGenderRef = useRef<HTMLInputElement | null>(null);
  const userFavoritePictureRef = useRef<HTMLInputElement | null>(null);
  const userTnCRef = useRef<HTMLInputElement | null>(null);
  const userCountryRef = useRef<HTMLInputElement | null>(null);

  const [errors, setErrors] = useState<FormErrors>({});

  const arrayCountries = useSelector(
    (state: RootState) => state.forms.countries
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = createValidationSchema(arrayCountries);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      userName: userNameRef.current?.value || '',
      userAge: userAgeRef.current?.value || '',
      userEmail: userEmailRef.current?.value || '',
      userPassword: userPasswordRef.current?.value || '',
      userPasswordConfirm: userPasswordConfirmRef.current?.value || '',
      userGender: userGenderRef.current?.checked || '',
      userFavoritePicture: userFavoritePictureRef.current?.files?.[0] || null,
      userTnC: userTnCRef.current?.checked || false,
      userCountry: userCountryRef.current?.value || '',
    };

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      let pictureBase64 = '';

      if (formData.userFavoritePicture) {
        pictureBase64 = await convertImageToBase64(
          formData.userFavoritePicture
        );
      }
      const updatedFormData = {
        ...formData,
        userFavoritePicture: pictureBase64,
      };

      dispatch(setUncontrolledFormUser(updatedFormData));
      navigate('/home');
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
      <Link className="button-home" to={'/home'}>
        Go to home
      </Link>
      <form className="uncontrolled-form" onSubmit={submitForm}>
        <h3 className="uncontrolled-form__title">Uncontrolled Form</h3>
        <div className="uncontrolled-form__item">
          <label htmlFor="userName">Name</label>
          <input
            ref={userNameRef}
            type="text"
            id="userName"
            name="userName"
            className="uncontrolled-form__input"
          />
          <p className="error-message">{errors.userName}</p>
        </div>

        <div className="uncontrolled-form__item">
          <label htmlFor="userAge">Age</label>
          <input
            ref={userAgeRef}
            type="number"
            id="userAge"
            name="userAge"
            className="uncontrolled-form__input"
          />
          <p className="error-message">{errors.userAge}</p>
        </div>

        <div className="uncontrolled-form__item">
          <label htmlFor="userEmail">Email</label>
          <input
            ref={userEmailRef}
            type="text"
            id="userEmail"
            name="userEmail"
            className="uncontrolled-form__input"
          />
          <p className="error-message">{errors.userEmail}</p>
        </div>

        <div className="uncontrolled-form__item">
          <label htmlFor="userPassword">Password</label>
          <input
            ref={userPasswordRef}
            type="password"
            id="userPassword"
            name="userPassword"
            className="uncontrolled-form__input"
          />
          <p className="error-message">{errors.userPassword}</p>
        </div>

        <div className="uncontrolled-form__item">
          <label htmlFor="userPasswordConfirm">Password confirm</label>
          <input
            ref={userPasswordConfirmRef}
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
              ref={userGenderRef}
              type="radio"
              id="male"
              name="userGender"
              value="male"
            ></input>
            <label htmlFor="male">Male</label>
            <input
              ref={userGenderRef}
              type="radio"
              id="female"
              name="userGender"
              value="female"
            ></input>
            <label htmlFor="female">Female</label>
          </div>
          <p className="error-message">{errors.userGender}</p>
        </div>

        <div className="uncontrolled-form__item">
          <AutocompleteCountry
            allCountries={arrayCountries}
            countryRef={userCountryRef}
          />
          <p className="error-message">{errors.userCountry}</p>
        </div>

        <div className="uncontrolled-form__item">
          <label htmlFor="userFavoritePicture">Favorite picture</label>
          <input
            ref={userFavoritePictureRef}
            id="userFavoritePicture"
            type="file"
            name="userFavoritePicture"
          ></input>
          <p className="error-message">{errors.userFavoritePicture}</p>
        </div>

        <div className="TnC-container">
          <div className="uncontrolled-form__item-TnC">
            <input
              type="checkbox"
              id="userTnC"
              name="userTnC"
              ref={userTnCRef}
            ></input>
            <label htmlFor="userTnC">
              I accept Terms and Conditions agreement
            </label>
          </div>
          <p className="error-message">{errors.userTnC}</p>
        </div>

        <button className="button-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UncontrolledForm;
