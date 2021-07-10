import express from 'express';
import { toErrorEntry } from './services/error';
import {
  getPatientsEntries,
  addPatient,
  getPatientById,
  toNewPatientEntry,
} from './services/patient';

import { getDiagnosisEntries } from './services/diagnosis';
import { Entry } from './diagnosesTypes';
const cors = require('cors');
import { toNewEntry, addEntry } from './services/entries';

const app = express();
const PORT = 3003;

app.use(express.json());
app.use(cors());

app.get('/api/diagnoses', (_req, res) => {
  res.send(getDiagnosisEntries());
});

app.get('/api/patients', (_req, res) => {
  res.send(getPatientsEntries());
});

app.get('/api/patients/:id', (req, res) => {
  const patient = getPatientById(req.params.id);

  if (patient) res.send(patient);
  else res.status(404).send();
});

app.post('/api/patients', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const patient = addPatient(newPatientEntry);
    res.status(201).json(patient);
  } catch (error) {
    console.error(error.message);
    const e = toErrorEntry(error);
    res.status(400).json({ error: e.message });
  }
});

app.post('/api/patients/:id/entries', (req, res) => {
  try {
    console.log(req.body);
    const reqEntry: Entry = toNewEntry(req.body);
    const entry = addEntry(req.params.id, reqEntry);

    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
