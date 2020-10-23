import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { LAYOUTS, LOGIN, NOT_FOUND, REGISTER, ROOT } from './routes.config';
import { TLayout, TRoute } from './routes.types';

type TProps = { isAuthenticated: boolean };

type TRenderRoute = (route: TRoute, isAuthenticated: boolean) => JSX.Element;

type TRenderRoutes = (
  routes: TRoute[],
  isAuthenticated: boolean,
) => JSX.Element[];

type TRenderLayoutArgs = {
  layout: TLayout;
  isAuthenticated: boolean;
  key: number;
};

type TRenderLayout = (args: TRenderLayoutArgs) => JSX.Element;

const renderRoute: TRenderRoute = (
  { path, exact, component: Component },
  isAuthenticated,
) => (
  <Route
    key={path}
    path={path}
    exact={exact}
    render={(props) => {
      const isAuthPage = path === LOGIN || path === REGISTER;

      if (isAuthenticated && isAuthPage) return <Redirect to={ROOT} />;

      if (!isAuthenticated && !isAuthPage && path !== NOT_FOUND)
        return <Redirect to={LOGIN} />;

      return <Component {...props} />;
    }}
  />
);

const renderRoutes: TRenderRoutes = (routes, isAuthenticated) =>
  routes.map((route) => renderRoute(route, isAuthenticated));

const renderLayout: TRenderLayout = ({
  layout: { routes, layout: Layout },
  isAuthenticated,
  key,
}) => {
  if (Layout)
    return (
      <Layout key={key}>
        <Switch>{renderRoutes(routes, isAuthenticated)}</Switch>
      </Layout>
    );

  return <Switch key={key}>{renderRoutes(routes, isAuthenticated)}</Switch>;
};

export const Routes: FC<TProps> = ({ isAuthenticated }) => (
  <div>
    {LAYOUTS.map((layout, key) =>
      renderLayout({ layout, isAuthenticated, key }),
    )}
  </div>
);
