import './uncontrolledFormStyles.scss';

function UncontrolledForm() {
  return (
    <form className="uncontrolled-form">
      <label htmlFor="userName">
        Name
        <input type="text" id="userName" />
      </label>

      <label htmlFor="userAge">
        Age
        <input type="text" id="userAge" />
      </label>

      <label htmlFor="userEmail">
        Email
        <input type="text" id="userEmail" />
      </label>

      <label htmlFor="userPassword">
        Password
        <input type="text" id="userPassword" />
      </label>

      <label htmlFor="userPasswordConfirm">
        Password confirm
        <input type="text" id="userPasswordConfirm" />
      </label>

      <div>
        Gender
        <div>
          <label htmlFor="male">Male</label>
          <input type="radio" id="male" name="gender" value="male"></input>
        </div>
        <div>
          <label htmlFor="female">Female</label>
          <input type="radio" id="female" name="gender" value="female"></input>
        </div>
      </div>

      <label>
        Country
        <input type="text"></input>
      </label>

      <label htmlFor="userFavoritePicture">
        Favorite picture<input id="userFavoritePicture" type="file"></input>
      </label>

      <div>
        <input type="checkbox" id="userT&C"></input>
        <label htmlFor="userT&C">I accept Terms and Conditions agreement</label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;
