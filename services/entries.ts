import { v4 as uuidv4 } from 'uuid';

import { Entry, BaseEntry } from '../diagnosesTypes';
import {
  parseText,
  parseTextArray,
  parseType,
  parseDischarge,
  parseHealth,
  parseSickLeave,
} from './utils';
import patients from '../data/patients';

interface Fields {
  id: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
}

interface HealthcheckFields extends Fields {
  type: 'HealthCheck';
  healthCheckRating: unknown;
}

interface OccupationalHealthcareFields extends Fields {
  type: 'OccupationalHealthCare';
  employerName: unknown;
  sickLeave?: { startDate: unknown; endDate: unknown };
}

interface HospitalFields extends Fields {
  type: 'Hospital';
  discharge: {
    date: unknown;
    criteria: unknown;
  };
}

type EntryFields = HealthcheckFields | OccupationalHealthcareFields | HospitalFields;

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

export const toNewEntry = (body: EntryFields): Entry => {
  const newEntry: BaseEntry = {
    id: uuidv4(),
    description: parseText(body.description),
    date: parseText(body.date),
    specialist: parseText(body.specialist),
    diagnosisCodes: parseTextArray(body.diagnosisCodes),
  };

  parseType(body.type);
  try {
    switch (body.type) {
      case 'HealthCheck': {
        const healthEntry: Entry = {
          ...newEntry,
          type: body.type,
          healthCheckRating: parseHealth(body.healthCheckRating),
        };
        return healthEntry;
      }
      case 'OccupationalHealthCare': {
        const occEntry: Entry = {
          ...newEntry,
          type: body.type,
          employerName: parseText(body.employerName),
          sickLeave: parseSickLeave(body.sickLeave),
        };
        return occEntry;
      }
      case 'Hospital': {
        const hosEntry: Entry = {
          ...newEntry,
          type: body.type,
          discharge: parseDischarge(body.discharge),
        };
        return hosEntry;
      }
      default:
        assertNever(body);
    }
  } catch (e) {
    throw e;
  }
  return undefined;
};

export const addEntry = (id: string, entry: Entry) => {
  patients.forEach((patient) => {
    if (patient.id === id) patient.entries.push(entry);
  });
  return entry;
};
