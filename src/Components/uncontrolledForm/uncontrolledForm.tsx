import { Link } from 'react-router-dom';
import './uncontrolledFormStyles.scss';
import { schema } from '../../utils/yupSchema';
import { useState } from 'react';
import * as Yup from 'yup';

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
    country: '',
    userFavoritePicture: null,
    userTnC: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked, files } = event.target;
    const file = type === 'file' && files ? files[0] : null;

    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? file : value,
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
    console.log(formData);
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
    <>
      <Link to={'/home'}>Go to home</Link>
      <form className="uncontrolled-form" onSubmit={submitForm}>
        <label htmlFor="userName">
          Name
          <input
            type="text"
            id="userName"
            onChange={handleChange}
            name="userName"
          />
          {errors.userName && <p>{errors.userName}</p>}
        </label>

        <label htmlFor="userAge">
          Age
          <input
            type="number"
            id="userAge"
            onChange={handleChange}
            name="userAge"
          />
          {errors.userAge && <p>{errors.userAge}</p>}
        </label>

        <label htmlFor="userEmail">
          Email
          <input
            type="text"
            id="userEmail"
            onChange={handleChange}
            name="userEmail"
          />
          {errors.userEmail && <p>{errors.userEmail}</p>}
        </label>

        <label htmlFor="userPassword">
          Password
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            onChange={handleChange}
          />
          {errors.userPassword && <p>{errors.userPassword}</p>}
        </label>

        <label htmlFor="userPasswordConfirm">
          Password confirm
          <input
            type="password"
            id="userPasswordConfirm"
            name="userPasswordConfirm"
          />
          {errors.userPasswordConfirm && <p>{errors.userPasswordConfirm}</p>}
        </label>

        <div>
          Gender
          <div>
            <input
              type="radio"
              id="male"
              name="userGender"
              value="male"
              onChange={handleChange}
            ></input>
            <label htmlFor="male">Male</label>
          </div>
          <div>
            <input
              type="radio"
              id="female"
              name="userGender"
              value="female"
              onChange={handleChange}
            ></input>
            <label htmlFor="female">Female</label>
          </div>
          {errors.userGender && <p>{errors.userGender}</p>}
        </div>

        <label>
          Country
          <input type="text"></input>
        </label>

        <label htmlFor="userFavoritePicture">
          Favorite picture
          <input
            id="userFavoritePicture"
            type="file"
            name="userFavoritePicture"
          ></input>
        </label>

        <div>
          <input
            type="checkbox"
            id="userTnC"
            name="userTnC"
            onChange={handleChange}
          ></input>
          <label htmlFor="userTnC">
            I accept Terms and Conditions agreement
          </label>
          {errors.userTnC && <p>{errors.userTnC}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default UncontrolledForm;
