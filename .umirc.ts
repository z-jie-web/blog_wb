import { defineConfig } from 'umi';
import routes from './config/router'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // layout: {name: '数据管理菜单',     locale: false, },
  routes: routes,
  fastRefresh: {},
});
