import { ComponentType, FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export type TRoute = {
  path: string;
  exact?: boolean;
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
};

export type TLayout = {
  layout?: FC;
  routes: TRoute[];
};
