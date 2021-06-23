import React from 'react';
import { Layout, Menu } from 'antd'; // 布局容器 导航菜单
import _ from 'lodash'; // 引入JS工具库
import { Link } from 'umi'; // umi自带的链接组件
import { menus } from '../../config/router'; // 配置的菜单项
import './index.less'; // 样式

const { SubMenu } = Menu; // 子菜单
const { Header, Content, Sider } = Layout; // 顶部布局， 内容部分， 侧边栏

export default function Index(props: any) {
  function getMenuItem(menuArr: any) {
    // 获取菜单项
    return _.map(menuArr, (route) => {
      if (route.children) {
        // 有多级菜单时
        return (
          <SubMenu className="subMenu" key={route.key} title={route.title}>
            {getMenuItem(route.children)}
            {/* // 重复调用函数渲染出子级菜单 */}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={route.key}>
          <Link to={route.path}>{route.title}</Link>
        </Menu.Item>
      );
    });
  }

  function sideBarRender() {
    return (
      //  <Sider width={180} style={{ height: 'calc(100vh-48px)' }}>
      <Menu
        mode="horizontal"
        theme="dark"
        // style={{ height: '100%', borderRight: 0 }}
      >
        {getMenuItem(menus)}
      </Menu>
      //  </Sider>
    );
  }

  return (
    <Layout>
      {/* <Header className='height-48' /> */}
      {sideBarRender()}
      {/* <Layout> */}
        <Content>
          111
          <div id="milk"> {props.children} </div>
        </Content>
      {/* </Layout> */}
    </Layout>
  );
}
