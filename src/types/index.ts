export type Advocate = {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: Array<string>;
  yearsOfExperience: number;
  phoneNumber: number;
};

export type GetAdvocatesResponse = {
  data: Array<Advocate>;
  count: number;
};
