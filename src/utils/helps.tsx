import { history } from 'umi';

export const linkTo = (url: string) => {
  if (!url) return;
  history.push(url);
};
