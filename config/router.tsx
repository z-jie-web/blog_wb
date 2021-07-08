export const menus = [
  { path: '/', redirect: 'index' },
  {
    title: '首页',
    path: '/index',
    icon: 'icon-dashboard',
    component: '@/pages/home',
    children: [],
  },
  {
    title: '个人文章',
    path: '/people',
    routes: [
      { path: '/', redirect: 'people' },
      { path: '/people', component: '@/pages/people' },
      {
        path: '/people/detail',
        component: '@/pages/people/detail',
      },
    ],
  },
  { title: '学习链接', path: '/study', component: '@/pages/study' },
  { title: '微前端', path: '/test', component: '@/pages/test' },
  { title: '联系', path: '/contact', component: '@/pages/contact' },
];

export default [
  {
    path: '/',
    component: '@/layouts/index.tsx',
    routes: menus,
  },
];
