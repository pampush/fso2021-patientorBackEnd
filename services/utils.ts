// import { Diagnose } from '../diagnosesTypes';
import { Gender } from '../types';
import { HealthCheckRating, Types, enumTypes } from '../diagnosesTypes';

function isString(text: unknown): text is string {
  return typeof text === 'string' || text instanceof String;
}

function isGender(str: string): str is Gender {
  return Object.values(Gender).includes(str as Gender);
}

function isBoolean(item: unknown): item is boolean {
  return typeof item === 'boolean' || item instanceof Boolean;
}

/**
 *
 * @param text
 * @returns
 */

const parseText = (text: unknown): string => {
  if (!(text && isString(text))) throw new Error('Text: Incorrect or missing text');
  return text;
};

/**
 *
 * @param gender
 * @returns
 */

const parseGender = (gender: unknown): Gender => {
  if (!(gender && isString(gender) && isGender(gender)))
    throw new Error('Incorrect or missong gender');
  return gender;
};

/**
 *
 * @param field
 * @returns
 */

const parseBoolean = (field: unknown): boolean => {
  if (!isBoolean(field)) throw new Error('Incorrect or missing value');
  return field;
};

/**
 *
 * @param array
 * @returns
 */

export function parseTextArray(array: unknown): string[] {
  if (!array) return [];
  if (!isStringArray(array)) throw new Error('Diagnosis codes: Incorrect or missing value');
  return array;
}

function isStringArray(array: unknown): array is string[] {
  return Array.isArray(array);
}

/**
 *
 * @param type
 * @returns
 */

export function parseType(type: unknown): Types {
  if (!(type && isString(type) && isType(type)))
    throw new Error('Types: Incorrect or missing value');
  return type;
}

function isType(type: unknown): type is Types {
  return Object.values(enumTypes).includes(type as enumTypes);
}

/**
 *
 * @param discharge
 * @returns
 */

export function parseDischarge(discharge: any): { date: string; criteria: string } {
  if (!(discharge && discharge.date && discharge.criteria && isFilled(discharge)))
    throw new Error('Incorrect or missing value');
  return discharge;
}

function isFilled(discharge: any): discharge is { date: string; criteria: string } {
  return isString(discharge.date) && isString(discharge.criteria);
}

/**
 *
 * @param rating
 * @returns
 */

export function parseHealth(rating: unknown): HealthCheckRating {
  if (rating === undefined || !isNumber(rating) || !isHealthCheckRating(rating))
    throw new Error('Incorrect or missing healthcheck rating');
  return rating;
}

function isNumber(rating: unknown): rating is number {
  return !Number.isNaN(parseInt(rating as string));
}

function isHealthCheckRating(rating: number): rating is HealthCheckRating {
  return Object.values(HealthCheckRating).includes(rating);
}

export function parseSickLeave(sickLeave: unknown): { startDate: string; endDate: string } {
  if (!(sickLeave && isSickLeave(sickLeave))) throw new Error('Incorrect or missing sick leave');
  return sickLeave;
}

const isSickLeave = (sickLeave: any): sickLeave is { startDate: string; endDate: string } => {
  return isString(sickLeave.startDate) && isString(sickLeave.endDate);
};

export { isString, isGender, isBoolean, parseText, parseGender, parseBoolean };
