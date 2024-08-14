import { InputsForm } from '../../utils/interfaces';
import './submittedFormStyles.scss';

interface SubmittedFormProps {
  form: InputsForm;
}

function SubmittedForm({ form }: SubmittedFormProps) {
  return (
    <div>
      <p>Name: {form.userName}</p>
      <p>Age: {form.userAge}</p>
      <p>Gender: {form.userGender}</p>
      <p>Country: {form.userCountry}</p>
      <p>Email: {form.userEmail}</p>
      <p>Password: {form.userPassword}</p>
      <p>Password confirm: {form.userPasswordConfirm}</p>
      <p>T&C: {JSON.stringify(form.userTnC)}</p>
      <img
        className="submitted-form__image"
        src={form.userFavoritePicture as string}
        alt=""
      />
    </div>
  );
}

export default SubmittedForm;
