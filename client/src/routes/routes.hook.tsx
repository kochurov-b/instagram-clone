import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  AUTHENTICATED_ROUTES,
  AUTH_ROUTES,
  BASIC_ROUTES,
  LOGIN,
  REGISTER,
  ROOT,
} from './routes.config';

import { TRoute } from './routes.types';

type TRenderRoute = (route: TRoute, isAuthenticated: boolean) => JSX.Element;

type TRenderRoutes = (
  routes: TRoute[],
  isAuthenticated: boolean,
) => JSX.Element;

type TUseRoutesExpected = {
  routes: JSX.Element;
};

type TUseRoutes = (isAuthenticated: boolean) => TUseRoutesExpected;

const renderRoute: TRenderRoute = (
  { path, exact, redirect, component: Component },
  isAuthenticated,
) => (
  <Route
    key={path}
    path={path}
    exact={exact}
    render={(props) => {
      const isNotAuthPage = path !== LOGIN && path !== REGISTER;

      if (!isAuthenticated && isNotAuthPage) return <Redirect to={LOGIN} />;

      if (redirect) return <Redirect to={ROOT} />;

      return <Component {...props} />;
    }}
  ></Route>
);

const renderRoutes: TRenderRoutes = (routes, isAuthenticated) => (
  <Switch>{routes.map((route) => renderRoute(route, isAuthenticated))}</Switch>
);

export const useRoutes: TUseRoutes = (isAuthenticated) => {
  const routesConfig: TRoute[] = isAuthenticated
    ? [...AUTHENTICATED_ROUTES, ...BASIC_ROUTES]
    : [...AUTH_ROUTES, ...BASIC_ROUTES];

  return { routes: renderRoutes(routesConfig, isAuthenticated) };
};
