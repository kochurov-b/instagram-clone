export interface IField {
  label: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
}

export interface IFormField extends IField {
  value: string;
}

export type TOnChange = (value: string) => void;
