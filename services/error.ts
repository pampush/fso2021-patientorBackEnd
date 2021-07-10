import { parseText } from './utils';
import { Error } from '../types';

type ErrorFields = { message: unknown };
export const toErrorEntry = (object: ErrorFields): Error => {
  const newEntry: Error = {
    message: parseText(object.message),
  };
  return newEntry;
};
