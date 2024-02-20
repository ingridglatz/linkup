type UserConstructorParams = {
  id?: string;
  name: string;
  email: string;
  photo?: string;
};

export class User {
  id: string;
  name: string;
  email: string;
  photo?: string;

  constructor(params: UserConstructorParams) {
    this.id = params.id || "";
    this.name = params.name;
    this.email = params.email;
    this.photo = params.photo;
  }
}
