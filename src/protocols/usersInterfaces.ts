interface NewUser {
  name: string;
  _class: string;
}

interface NewUserValidation extends NewUser {
  token: string;
}

export { NewUser, NewUserValidation };
