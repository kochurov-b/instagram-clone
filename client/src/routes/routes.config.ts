import { Auth } from '../pages/Auth/Auth';
import { Main } from '../pages/Main/Main';
import { NotFound } from '../pages/NotFound/NotFound';
import { Base as BaseContainer } from '../containers/Base/Base';
import { TRoute } from './routes.types';

export const ROOT = '/';
export const LOGIN = '/login';
export const REGISTER = '/register';
export const DIRECT = '/direct';
export const EXPLORER = '/explorer';
export const PROFILE = '/profile';
export const NOT_FOUND = '*';

const DEFAULT_ROUTES: TRoute[] = [
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
    path: DIRECT,
    component: Main,
  },
  {
    path: EXPLORER,
    component: Main,
  },
  {
    path: PROFILE,
    component: NotFound,
  },
];

export const LAYOUTS = [
  {
    routes: AUTH_ROUTES,
  },
  {
    layout: BaseContainer,
    routes: [...AUTHENTICATED_ROUTES, ...DEFAULT_ROUTES],
  },
];
