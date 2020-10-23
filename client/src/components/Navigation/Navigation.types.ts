import { FunctionComponent, SVGProps } from 'react';

import { TProps as TPropsIconLink } from '../IconNavLink/IconNavLink.types';

export type TAction = {
  icon: FunctionComponent<
    SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  path: string;
  exact?: boolean;
  component: React.FC<TPropsIconLink>;
};
