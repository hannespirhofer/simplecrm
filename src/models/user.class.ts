export class User {
  id: string;
  firstname: string;
  lastname: string;
  birthdate: number; //Timestamp
  street: string;
  zipcode: Number;
  city: string;
  email: string;

  constructor(obj: any) {
    this.id = obj ? obj.id : '';
    this.firstname = obj ? obj.firstname : '';
    this.lastname = obj ? obj.lastname : '';
    this.birthdate = obj ? obj.birthdate : 0;
    this.street = obj ? obj.street : '';
    this.zipcode = obj ? obj.zipcode : 0;
    this.city = obj ? obj.city : '';
    this.email = obj ? obj.email : '';
  }
}
