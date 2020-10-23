import React, { FC, useContext, useMemo, useState } from 'react';

import { IconNavLink } from '../../components/IconNavLink/IconNavLink';
import { TAction } from '../../components/Navigation/Navigation.types';
import { DIRECT, EXPLORER, PROFILE, ROOT } from '../../routes/routes.config';
import { BaseLayout } from './Base.layout';

import { ReactComponent as Home } from '../../assets/images/home.svg';
import { ReactComponent as Direct } from '../../assets/images/direct.svg';
import { ReactComponent as Find } from '../../assets/images/find.svg';
import { ReactComponent as Profile } from '../../assets/images/profile.svg';
import { AuthContext } from '../../context/Auth.context';

export const Base: FC = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const actions: TAction[] = useMemo(
    () => [
      {
        icon: Home,
        path: ROOT,
        exact: true,
        component: IconNavLink,
      },
      {
        icon: Direct,
        path: DIRECT,
        component: IconNavLink,
      },
      {
        icon: Find,
        path: EXPLORER,
        component: IconNavLink,
      },
      {
        icon: Profile,
        path: PROFILE,
        component: IconNavLink,
      },
    ],
    [],
  );
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <BaseLayout
      isAuthenticated={isAuthenticated}
      children={children}
      actions={actions}
      searchValue={searchValue}
      onChangeSearch={setSearchValue}
    />
  );
};
