import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileTextOutlined,
  UserOutlined,
  DashboardOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, message } from 'antd';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const AppMenu = [
  {
    key: '/admin/dashboard',
    icon: <DashboardOutlined />,
    label: '看板',
  },
  {
    key: '/admin/medicine',
    icon: <VideoCameraOutlined />,
    label: '药品管理',
    children: [
      {
        key: '/admin/medicine/list',
        label: '药品分类',
      },
      {
        key: '/admin/medicine/info',
        label: '药品信息',
      },
    ],
  },
  {
    key: '/admin/article',
    icon: <FileTextOutlined />,
    label: '文章管理',
    children: [
      {
        key: '/admin/article/list',
        label: '文章分类',
      },
      {
        key: '/admin/article/info',
        label: '文章信息',
      },
    ],
  },
  {
    key: '/admin/users',
    icon: <UserOutlined />,
    label: '会员信息',
  },
];

const AppLayout = ({ children }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  // 默认展开的 submenu
  const defaultOpenKey = location.pathname.split('/').slice(0, -1).join('/');

  const handleClick = ({ key }: { key: string }) => {
    if (key === 'user-center') {
      message.info('暂未开通');
      return;
    }
    navigate(key);
  };
  return (
    <Layout style={{ width: '100vw', height: '100vh' }} className="app-layout ">
      <Sider className="app-sider" trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="light"
          onClick={handleClick}
          mode="inline"
          defaultOpenKeys={[defaultOpenKey]}
          defaultSelectedKeys={[location.pathname]}
          items={AppMenu}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <span className="app-title">xxx管理系统</span>
          <Dropdown
            menu={{
              items: [
                { label: '个人中心', key: 'user-center' }, // 菜单项务必填写 key
                { label: '退出', key: '/' },
              ],
              onClick: handleClick,
            }}
          >
            <span className="app-user">admin</span>
          </Dropdown>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
