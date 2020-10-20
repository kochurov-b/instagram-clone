export enum ESeverity {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Success = 'success',
}

interface ICommonArgs {
  open: boolean;
  message: string;
  severity: ESeverity;
}

export interface IUseSnackbarExpected extends ICommonArgs {
  openSnackbar: TOpenSnackbar;
  closeSnackbar: () => void;
}

export type TOpenSnackbar = (args: ICommonArgs) => void;
