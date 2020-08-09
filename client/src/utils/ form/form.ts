import { IField } from '../../components/Field/Field.types';

export const generateForm = <K>(fields: IField[]): K =>
  fields.reduce(
    (acc, { label, name, required = false, disabled = false }) => ({
      ...acc,
      [name]: {
        label,
        name,
        value: '',
        disabled,
        required,
      },
    }),
    {} as K,
  );
