import { FunctionComponent, SVGProps } from 'react';

export type TProps = {
  path: string;
  icon: FunctionComponent<
    SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  exact?: boolean;
};
