export interface IDiagnose {
  id: number;
  name: string;
  description: string;
}

export class  Diagnose implements IDiagnose {
  constructor(public id: number,
              public name: string,
              public description: string) {}
}
