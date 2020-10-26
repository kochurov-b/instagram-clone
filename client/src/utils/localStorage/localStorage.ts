import { EStorageName } from './localStorage.types';

type TSetStorage = (name: EStorageName, data: any) => void;

type TRemoveStorage = (name: EStorageName) => void;

export const getStorage = <T>(name: EStorageName): T | undefined => {
  const data = localStorage.getItem(name);

  if (data !== null) return JSON.parse(data);
};

export const setStorage: TSetStorage = (name, data) =>
  localStorage.setItem(name, JSON.stringify(data));

export const removeStorage: TRemoveStorage = (name) =>
  localStorage.removeItem(name);
