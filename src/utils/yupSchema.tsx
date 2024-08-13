import * as Yup from 'yup';

export const schema = Yup.object().shape({
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
    .email('Email must be a valid'),

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

  userCountry: Yup.string().required('Country is required'),
});
