interface IOnChangeArgs<T> {
  value: string;
  name: keyof T;
  required: boolean;
}

export type TOnChange<T> = (args: IOnChangeArgs<T>) => void;
