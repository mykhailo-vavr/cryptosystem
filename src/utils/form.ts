import { FormInstance, FormRule } from 'antd';
import { Schema } from 'yup';

export const yupSync = (path: string, validationSchema: Schema, required = true): FormRule[] => [
  {
    async validator(_, value: string) {
      await validationSchema.validateSyncAt(path, { [path]: value });
    },

    required,
  },
];

export const hasError = (form: FormInstance) => form.getFieldsError().some(({ errors }) => errors.length);
