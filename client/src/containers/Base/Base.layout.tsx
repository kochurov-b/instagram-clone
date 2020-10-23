import React, { FC } from 'react';

import { Navigation } from '../../components/Navigation/Navigation';
import { TAction } from '../../components/Navigation/Navigation.types';
import { TOnChange as TOnChangeSearch } from '../../components/SearchField/SearchField.types';

type TProps = {
  isAuthenticated: boolean;
  actions: TAction[];
  searchValue: string;
  onChangeSearch: TOnChangeSearch;
};

export const BaseLayout: FC<TProps> = ({
  isAuthenticated,
  children,
  actions,
  searchValue,
  onChangeSearch,
}) => (
  <>
    <Navigation
      isAuthenticated={isAuthenticated}
      actions={actions}
      searchValue={searchValue}
      onChangeSearch={onChangeSearch}
    />
    <main>{children}</main>
  </>
);
