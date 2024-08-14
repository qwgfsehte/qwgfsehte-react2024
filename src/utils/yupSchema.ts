import * as Yup from 'yup';

export const createValidationSchema = (arrayCountries: string[]) => {
  return Yup.object().shape({
    userName: Yup.string()
      .required('Name is required')
      .min(1, 'Name must not be empty')
      .matches(/^[A-Z]/, 'Name must start with a capital letter'),

    userAge: Yup.number()
      .required('Age is required')
      .typeError('Age is required')
      .positive('Age cannot be negative'),

    userEmail: Yup.string()
      .required('Email is required')
      .email('Email must be valid'),

    userPassword: Yup.string()
      .required('Password is required')
      .min(6, 'Password must contain at least 6 characters')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one special character'
      ),

    userPasswordConfirm: Yup.string()
      .required('Password confirmation is required')
      .oneOf([Yup.ref('userPassword')], 'Passwords must match'),

    userGender: Yup.string().required('Gender is required'),

    userTnC: Yup.boolean()
      .required()
      .isTrue('You must accept the terms and conditions'),

    userCountry: Yup.string()
      .required('Country is required')
      .oneOf(arrayCountries, 'Country is not valid'),

    userFavoritePicture: Yup.mixed<File | FileList>()
      .required('Picture is required')
      .test('is-file-or-filelist', 'No file selected.', value => {
        if (value instanceof File) {
          return true;
        } else if (value instanceof FileList && value.length > 0) {
          return true;
        }
        return false;
      })
      .test(
        'fileSize',
        'File size is too large. Maximum allowed size is 2MB.',
        value => {
          if (!value) {
            return false;
          }

          if (value instanceof File) {
            return value.size <= 2 * 1024 * 1024;
          } else if (value instanceof FileList && value.length > 0) {
            const file = value[0];
            return file.size <= 2 * 1024 * 1024;
          }
          return false;
        }
      )
      .test(
        'fileType',
        'Only the following formats are accepted: .jpeg, .png',
        value => {
          if (!value) {
            return false;
          }

          const allowedTypes = ['image/jpeg', 'image/png'];

          if (value instanceof File) {
            return allowedTypes.includes(value.type);
          } else if (value instanceof FileList && value.length > 0) {
            const file = value[0];
            return allowedTypes.includes(file.type);
          }
          return false;
        }
      ),
  });
};
