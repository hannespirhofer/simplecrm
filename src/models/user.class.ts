export class User {
  id: string = '';
  firstname: string = '';
  lastname: string = '';
  birthdate: number = NaN;
  street: string = '';
  zipcode: string = '';
  city: string = '';
  email: string = '';
  notes: string = '';
  isDefault: boolean = false;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
