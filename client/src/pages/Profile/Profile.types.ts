export enum ECounter {
  Posts = 'posts',
  Followers = 'followers',
  Following = 'following',
}

export type TCounter = {
  name: ECounter;
  count: number;
};
