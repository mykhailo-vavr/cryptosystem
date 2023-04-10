import { useMemo, useCallback } from 'react';
import {
  number as numberYup,
  string as stringYup,
  date as dateYup,
  array as arrayYup,
  NumberSchema,
  StringSchema,
  DateSchema,
  bool as boolYup,
  object as objectYup,
  BooleanSchema,
} from 'yup';

export default () => {
  const getRequiredFieldSchema = useCallback(
    (fieldSchema: NumberSchema | StringSchema | DateSchema | BooleanSchema) =>
      fieldSchema.required('This field is required'),
    [],
  );

  const { number, string, date, bool, array, object } = useMemo(
    () => ({
      number: numberYup().typeError(''),
      string: stringYup().typeError('').trim(),
      date: dateYup().typeError(''),
      bool: boolYup().typeError(''),
      array: arrayYup(),
      object: objectYup().nullable(),
    }),
    [],
  );

  const { onlyLetters, email } = useMemo(
    () => ({
      onlyLetters: string.matches(/^[a-zA-Zа-яА-ЯґҐєЄіІїЇ]+$/, 'Only letters'),
      email: string.email('Емейл'),
    }),
    [string],
  );

  return useMemo(
    () => ({
      onlyLetters,
      email,
      string,
      date,
      number,
      bool,
      array,
      object,
      requiredOnlyLetters: getRequiredFieldSchema(onlyLetters),
      requiredEmail: getRequiredFieldSchema(email),
      requiredString: getRequiredFieldSchema(string),
      requiredDate: getRequiredFieldSchema(date),
      requiredNumber: getRequiredFieldSchema(number),
      requiredBool: getRequiredFieldSchema(bool),
      getRequiredFieldSchema,
    }),
    [onlyLetters, email, string, date, number, bool, array, object, getRequiredFieldSchema],
  );
};
