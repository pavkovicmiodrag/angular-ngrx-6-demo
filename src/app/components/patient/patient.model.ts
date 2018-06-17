export interface IPatient {
  id: number;
  firstname: string;
  lastname: string;
  middlename: string;
  birthdate: Date;
  gender: string;
  place: string;
  address: string,
  email: string;
  phone: string;
  mobilephone: string;
  photo: string;
  allergies: string;
  notes: string;
}

export class  Patient implements IPatient {

  constructor(public id: number,
              public firstname: string,
              public lastname: string,
              public middlename: string,
              public birthdate: Date,
              public gender: string,
              public place: string,
              public address: string,
              public email: string,
              public phone: string,
              public mobilephone: string,
              public photo: string,
              public allergies: string,
              public notes: string) {}
}
