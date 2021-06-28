export interface IRouter {
  path: string;
  children?: [];
  component?: string;
  title?: string;
  redirect?: string;
}
