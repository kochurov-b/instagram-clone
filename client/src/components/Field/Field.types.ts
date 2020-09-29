export interface IField {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  disabled?: boolean;
}

export interface IFormField extends IField {
  value: string;
  error: string;
}

export type TOnChange = (value: string) => void;
