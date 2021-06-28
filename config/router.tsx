export const menus = [
  { path: '/', redirect: 'index' },
  {
    title: '用户管理',
    path: '/index',
    component: '@/pages/index.tsx',
    children: [],
  },
  { title: '测试', path: '/test', component: '@/pages/test' },
];

export default [
  {
    path: '/',
    component: '@/layouts/index.tsx',
    routes: menus,
  },
];
