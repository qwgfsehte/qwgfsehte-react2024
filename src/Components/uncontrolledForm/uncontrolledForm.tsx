import { Link, useNavigate } from 'react-router-dom';
import '../formsStyles.scss';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import AutocompleteCountry from '../autocompleteCountry/autocompleteCountry';
import { createValidationSchema } from '../../utils/yupSchema';
import { setUncontrolledFormUser } from '../formsSlice.slice';
import { convertImageToBase64 } from '../../utils/convertImage';
import PasswordStrengthIndicator from '../passwordStrength/passwordStrength';

interface FormErrors {
  [key: string]: string;
}

function UncontrolledForm() {
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const userAgeRef = useRef<HTMLInputElement | null>(null);
  const userEmailRef = useRef<HTMLInputElement | null>(null);
  const userPasswordRef = useRef<HTMLInputElement | null>(null);
  const userPasswordConfirmRef = useRef<HTMLInputElement | null>(null);
  const userMaleRef = useRef<HTMLInputElement | null>(null);
  const userFemaleRef = useRef<HTMLInputElement | null>(null);
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
      userGender: userMaleRef.current?.checked
        ? 'male'
        : userFemaleRef.current?.checked
          ? 'female'
          : '',
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
        isNew: true,
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

  const minStrength = Object.keys(errors).filter(key =>
    key.includes('userPassword')
  ).length;

  return (
    <div className="form-container uncontrolled-form">
      <Link className="button-home" to={'/home'}>
        ← Go to home
      </Link>
      <form className="form" onSubmit={submitForm}>
        <h3 className="form__title">Uncontrolled Form</h3>
        <div className="form__item">
          <label htmlFor="userName">Name</label>
          <input
            ref={userNameRef}
            type="text"
            id="userName"
            name="userName"
            className="form__input"
            autoComplete="off"
          />
          <p className="error-message">{errors.userName}</p>
        </div>

        <div className="form__item">
          <label htmlFor="userAge">Age</label>
          <input
            ref={userAgeRef}
            type="number"
            id="userAge"
            name="userAge"
            className="form__input"
          />
          <p className="error-message">{errors.userAge}</p>
        </div>

        <div className="form__item">
          <label htmlFor="userEmail">Email</label>
          <input
            ref={userEmailRef}
            type="text"
            id="userEmail"
            name="userEmail"
            className="form__input"
            autoComplete="off"
          />
          <p className="error-message">{errors.userEmail}</p>
        </div>

        <div className="form__item">
          <label htmlFor="userPassword">Password</label>
          <input
            ref={userPasswordRef}
            type="password"
            id="userPassword"
            name="userPassword"
            className="form__input"
          />
          <PasswordStrengthIndicator
            password={userPasswordRef.current?.value || ''}
            minStrength={minStrength}
          />
          <p className="error-message">{errors.userPassword}</p>
        </div>

        <div className="form__item">
          <label htmlFor="userPasswordConfirm">Password confirm</label>
          <input
            ref={userPasswordConfirmRef}
            type="password"
            id="userPasswordConfirm"
            name="userPasswordConfirm"
            className="form__input"
          />
          <p className="error-message">{errors.userPasswordConfirm}</p>
        </div>

        <div className="gender-container">
          <div className="form__gender-list">
            <p>Gender:</p>
            <div className="gender-list__item">
              <input
                ref={userMaleRef}
                type="radio"
                id="male"
                name="userGender"
                value="male"
              ></input>
              <label htmlFor="male">Male</label>
            </div>
            <div className="gender-list__item">
              <input
                ref={userFemaleRef}
                type="radio"
                id="female"
                name="userGender"
                value="female"
              ></input>
              <label htmlFor="female">Female</label>
            </div>
          </div>
          <p className="error-message">{errors.userGender}</p>
        </div>

        <div className="form__item">
          <AutocompleteCountry
            allCountries={arrayCountries}
            countryRef={userCountryRef}
          />
          <p className="error-message">{errors.userCountry}</p>
        </div>

        <div className="form__item-picture">
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
          <div className="form__item-TnC">
            <input
              type="checkbox"
              id="userTnC"
              name="userTnC"
              ref={userTnCRef}
              className="TnC-checkbox"
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
