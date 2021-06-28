import React from 'react';
import { Layout, Menu } from 'antd'; // 布局容器 导航菜单
import _, { isEmpty } from 'lodash'; // 引入JS工具库
import { Link } from 'umi'; // umi自带的链接组件
import { menus } from '../../config/router'; // 配置的菜单项
import { IRouter } from './interface'; // 配置的菜单项
import './index.less'; // 样式

const { SubMenu } = Menu; // 子菜单
const { Header, Content, Sider } = Layout; // 顶部布局， 内容部分， 侧边栏

const Index = (props: any) => {
  const getMenuItem = (menuArr: any) => {
    return _.map(menuArr, (route: IRouter) => {
      if (route.path === '/') return;
      if (!isEmpty(route.children)) {
        // 有多级菜单时
        // 重复调用函数渲染出子级菜单
        return (
          <SubMenu key={route.path} title={route.title}>
            {getMenuItem(route.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={route.path}>
          <Link to={route.path}>{route.title}</Link>
        </Menu.Item>
      );
    });
  };

  // console.log(window.location.pathname, 'window.location.pathname');

  const header = () => {
    return (
      <Menu
        mode="horizontal"
        theme="dark"
        selectedKeys={[window.location.pathname]}
      >
        {getMenuItem(menus)}
      </Menu>
    );
  };

  return (
    <Layout>
      <Header>{header()}</Header>
      <Layout>
        <Content>
          <div id="milk"> {props.children} </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Index;
