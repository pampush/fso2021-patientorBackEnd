import { Entry } from './diagnosesTypes';

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}


export interface Error {
  message: string;
}

export type NoSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
