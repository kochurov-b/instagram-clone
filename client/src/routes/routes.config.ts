import { Auth } from '../pages/Auth/Auth';
import { Main } from '../pages/Main/Main';
import { NotFound } from '../pages/NotFound/NotFound';
import { TRoute } from './routes.types';

export const ROOT = '/';
export const LOGIN = '/login';
export const REGISTER = '/register';
const NOT_FOUND = '*';

export const BASIC_ROUTES: TRoute[] = [
  {
    path: ROOT,
    exact: true,
    component: Main,
  },
  {
    path: NOT_FOUND,
    component: NotFound,
  },
];

export const AUTH_ROUTES: TRoute[] = [
  {
    path: LOGIN,
    component: Auth,
  },
  {
    path: REGISTER,
    component: Auth,
  },
];

export const AUTHENTICATED_ROUTES: TRoute[] = [
  {
    path: ROOT,
    redirect: true,
    component: Main,
  },
];
