import patients from '../data/patients';
//import diagnosesData from '../data/diagnoses.json';
import { v4 as uuidv4 } from 'uuid';
import { NoSensitivePatient, Patient } from '../types';
import { parseGender, parseText } from './utils';
import { Entry } from '../diagnosesTypes';

//const diagnoses: Array<Diagnose> = diagnosesData as Array<Diagnose>;

export const getPatientsEntries = (): Array<NoSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, occupation, gender }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const getPatientById = (idParam: string): Patient | undefined => {
  const newEntry = patients.find((item) => item.id === idParam);
  return newEntry;
};

export const addPatient = (entry: Omit<Patient, 'id'>): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

type Fields = {
  id: unknown;
  name: unknown;
  gender: unknown;
  occupation: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  entries: unknown;
};

export const toNewPatientEntry = (object: Fields): Patient => {
  const newEntry: Patient = {
    id: uuidv4(),
    name: parseText(object.name),
    gender: parseGender(object.gender),
    occupation: parseText(object.occupation),
    dateOfBirth: parseText(object.dateOfBirth),
    ssn: parseText(object.ssn),
    entries: object.entries ? (object.entries as Entry[]) : [],
  };

  return newEntry;
};
