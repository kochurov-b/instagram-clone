import { IField } from '../../components/Field/Field.types';

export const generateForm = <K>(fields: IField[]): K =>
  fields.reduce(
    (acc, { label, name, type, required = false, disabled = false }) => ({
      ...acc,
      [name]: {
        label,
        name,
        type,
        value: '',
        error: '',
        disabled,
        required,
      },
    }),
    {} as K,
  );
