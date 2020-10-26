import React, { FC, useCallback, useContext, useEffect, useMemo } from 'react';

import { AuthContext } from '../../context/Auth.context';
import { ProfileError } from '../../hooks/fetch/fetch.errors';
import { useFetch } from '../../hooks/fetch/fetch.hook';
import { StoreContext } from '../../store/store.context';
import { setUserInfo } from '../../store/User/User.actions';
import { TUserResponseData } from '../../store/User/User.types';
import { ProfileLayout } from './Profile.layout';
import { TCounter, ECounter } from './Profile.types';

type TGetUserInfo = (id: string) => Promise<void>;

export const Profile: FC = () => {
  const { get } = useFetch();
  const { userId, logout } = useContext(AuthContext);
  const {
    state: {
      user: { username, full_name, posts, followers, following },
    },
    dispatch,
  } = useContext(StoreContext);
  const counters: TCounter[] = useMemo(
    () => [
      {
        name: ECounter.Posts,
        count: posts.count,
      },
      {
        name: ECounter.Followers,
        count: followers.count,
      },
      {
        name: ECounter.Following,
        count: following.count,
      },
    ],
    [posts, followers, following],
  );

  const getUserInfo: TGetUserInfo = useCallback(
    async (id) => {
      const response = await get<TUserResponseData>(`user/${id}`);

      response
        .mapLeft(() => new ProfileError(`Couldn't get the user data`))
        .mapRight((data) => {
          data.mapRight(({ data: { user } }) => {
            dispatch(setUserInfo(user));
          });
        });
    },
    [get, dispatch],
  );

  useEffect(() => {
    if (userId !== null) getUserInfo(userId);
  }, [userId, getUserInfo]);

  return (
    <ProfileLayout
      username={username}
      fullName={full_name}
      counters={counters}
      logout={logout}
    />
  );
};
