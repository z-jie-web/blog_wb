import { defineConfig } from 'umi';
import routes from './config/router';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // layout: {
  //   name: '数据管理菜单',
  //   locale: true,
  //   component: '@/layouts/index.tsx',
  // },
  routes: routes,
  fastRefresh: {},
  proxy: {
    '/api': {
      // 标识需要进行转换的请求的url
      // target: 'http://192.168.72.113:10086/', // 服务端域名
      target: 'http://30.11.171.36:10086/', // 服务端域名
      changeOrigin: true, // 允许域名进行转换
      pathRewrite: { '^/api': '/api' }, // 将请求url里的ci去掉
    },
  },
});
