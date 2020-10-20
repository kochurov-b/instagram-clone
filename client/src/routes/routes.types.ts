import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export type TRoute = {
  path: string;
  exact?: boolean;
  redirect?: boolean;
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
};
