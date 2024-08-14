import { useSelector } from 'react-redux';
import { createValidationSchema } from '../../utils/yupSchema';
import { RootState } from '../store';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import AutocompleteCountry from '../autocompleteCountry/autocompleteCountry';
import { Link } from 'react-router-dom';
import '../formsStyles.scss';

function ReactHookForm() {
  const arrayCountries = useSelector(
    (state: RootState) => state.forms.countries
  );

  const validationSchema = createValidationSchema(arrayCountries);
  const {
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  return (
    <div className="form-container react-hook-form">
      <Link className="button-home" to={'/home'}>
        Go to home
      </Link>
      <form className="form">
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
            {...register('userPassword')}
            type="password"
            id="userPassword"
            name="userPassword"
            className="form__input"
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

        <div className="form__item">
          <div className="form__item-gender">
            <p>Gender:</p>
            <input
              {...register('userGender')}
              type="radio"
              id="male"
              name="userGender"
              value="male"
            ></input>
            <label htmlFor="male">Male</label>
            <input
              {...register('userGender')}
              type="radio"
              id="female"
              name="userGender"
              value="female"
            ></input>
            <label htmlFor="female">Female</label>
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
            ></input>
            <label htmlFor="userTnC">
              I accept Terms and Conditions agreement
            </label>
          </div>
          <p className="error-message">{errors.userTnC?.message}</p>
        </div>

        <button className="button-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReactHookForm;
