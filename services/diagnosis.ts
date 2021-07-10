import diagnosesJSON from '../data/diagnoses.json';
import { Diagnosis } from '../diagnosesTypes';

const diagnosis: Array<Diagnosis> = diagnosesJSON as Array<Diagnosis>;

export function getDiagnosisEntries() {
  return diagnosis;
}