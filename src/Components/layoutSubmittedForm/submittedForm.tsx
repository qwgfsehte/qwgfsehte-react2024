import { InputsForm } from '../../utils/interfaces';
import './submittedFormStyles.scss';

interface SubmittedFormProps {
  form: InputsForm;
  isHighlighted: boolean;
}

function SubmittedForm({ form, isHighlighted }: SubmittedFormProps) {
  return (
    <div className={`submitted-form ${isHighlighted ? 'highlight' : ''}`}>
      <div>
        <p>Name: {form.userName}</p>
        <p>Age: {form.userAge}</p>
        <p>Gender: {form.userGender}</p>
        <p>Country: {form.userCountry}</p>
        <p>Email: {form.userEmail}</p>
        <p>Password: {form.userPassword}</p>
        <p>Password confirm: {form.userPasswordConfirm}</p>
        <p>T&C: {JSON.stringify(form.userTnC)}</p>
      </div>
      <div className="img-container">
        Favorite image:
        <img
          className="submitted-form__image"
          src={form.userFavoritePicture as string}
          alt=""
        />
      </div>
    </div>
  );
}

export default SubmittedForm;
