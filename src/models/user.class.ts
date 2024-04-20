export class User {
  id: string = '';
  firstname: string = 'Max';
  lastname: string = 'Mustermann';
  birthdate: number = 0; //Timestamp
  street: string = 'Teststraße 12';
  zipcode: Number = 0;
  city: string = 'Berlin';
  email: string = 'mail@test.de';

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
