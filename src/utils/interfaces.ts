export interface InputsForm {
  userName: string;
  userAge: string | number;
  userEmail: string;
  userPassword: string;
  userPasswordConfirm: string;
  userGender: string;
  userCountry: string;
  userFavoritePicture: null | string | FileList | File;
  userTnC: boolean;
}
