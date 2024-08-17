import { useDispatch, useSelector } from 'react-redux';
import { createValidationSchema } from '../../utils/yupSchema';
import { RootState } from '../store';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import AutocompleteCountry from '../autocompleteCountry/autocompleteCountry';
import { Link, useNavigate } from 'react-router-dom';
import '../formsStyles.scss';
import { convertImageToBase64 } from '../../utils/convertImage';
import { setReactHookFormUser } from '../formsSlice.slice';
import { InputsForm } from '../../utils/interfaces';
import PasswordStrengthIndicator from '../passwordStrength/passwordStrength';
import { useState } from 'react';

function ReactHookForm() {
  const arrayCountries = useSelector(
    (state: RootState) => state.forms.countries
  );
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = createValidationSchema(arrayCountries);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: InputsForm) => {
    let pictureBase64 = '';

    if (
      data.userFavoritePicture instanceof FileList &&
      data.userFavoritePicture.length > 0
    ) {
      const picture = data.userFavoritePicture[0];
      pictureBase64 = await convertImageToBase64(picture);
    }

    const resultData = { ...data, userFavoritePicture: pictureBase64 };

    dispatch(setReactHookFormUser(resultData));
    navigate('/home');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const minStrength = Object.keys(errors).length;

  return (
    <div className="form-container react-hook-form">
      <Link className="button-home" to={'/home'}>
        ← Go to home
      </Link>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="form__title">React Hook Form</h3>
        <div className="form__item">
          <label htmlFor="userName">Name</label>
          <input
            {...register('userName')}
            type="text"
            id="userName"
            name="userName"
            className="form__input"
          />
          <p className="error-message">{errors.userName?.message}</p>
        </div>

        <div className="form__item">
          <label htmlFor="userAge">Age</label>
          <input
            {...register('userAge')}
            type="number"
            id="userAge"
            name="userAge"
            className="form__input"
          />
          <p className="error-message">{errors.userAge?.message}</p>
        </div>

        <div className="form__item">
          <label htmlFor="userEmail">Email</label>
          <input
            {...register('userEmail')}
            type="text"
            id="userEmail"
            name="userEmail"
            className="form__input"
          />
          <p className="error-message">{errors.userEmail?.message}</p>
        </div>

        <div className="form__item">
          <label htmlFor="userPassword">Password</label>
          <input
            {...register('userPassword', {
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                handlePasswordChange(event);
              },
            })}
            type="password"
            id="userPassword"
            name="userPassword"
            className="form__input"
          />
          <PasswordStrengthIndicator
            password={password}
            minStrength={minStrength}
          />
          <p className="error-message">{errors.userPassword?.message}</p>
        </div>

        <div className="form__item">
          <label htmlFor="userPasswordConfirm">Password confirm</label>
          <input
            {...register('userPasswordConfirm')}
            type="password"
            id="userPasswordConfirm"
            name="userPasswordConfirm"
            className="form__input"
          />
          <p className="error-message">{errors.userPasswordConfirm?.message}</p>
        </div>

        <div className="gender-container">
          <div className="form__gender-list">
            <p>Gender:</p>
            <div className="gender-list__item">
              <input
                {...register('userGender')}
                type="radio"
                id="male"
                name="userGender"
                value="male"
              ></input>
              <label htmlFor="male">Male</label>
            </div>
            <div className="gender-list__item">
              <input
                {...register('userGender')}
                type="radio"
                id="female"
                name="userGender"
                value="female"
              ></input>
              <label htmlFor="female">Female</label>
            </div>
          </div>
          <p className="error-message">{errors.userGender?.message}</p>
        </div>

        <div className="form__item">
          <Controller
            control={control}
            name="userCountry"
            render={({ field: { onChange } }) => (
              <AutocompleteCountry
                allCountries={arrayCountries}
                onChange={onChange}
              />
            )}
          />
          <p className="error-message">{errors.userCountry?.message}</p>
        </div>

        <div className="form__item">
          <label htmlFor="userFavoritePicture">Favorite picture</label>
          <input
            {...register('userFavoritePicture')}
            id="userFavoritePicture"
            type="file"
            name="userFavoritePicture"
          ></input>
          <p className="error-message">{errors.userFavoritePicture?.message}</p>
        </div>

        <div className="form__item">
          <div className="form__item-TnC">
            <input
              {...register('userTnC')}
              type="checkbox"
              id="userTnC"
              name="userTnC"
              className="TnC-checkbox"
            ></input>
            <label htmlFor="userTnC">
              I accept Terms and Conditions agreement
            </label>
          </div>
          <p className="error-message">{errors.userTnC?.message}</p>
        </div>

        <button
          className="button-submit"
          type="submit"
          disabled={Object.keys(errors).length > 0}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReactHookForm;
