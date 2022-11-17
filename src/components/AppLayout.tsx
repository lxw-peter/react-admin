import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  FileTextOutlined,
  UserOutlined,
  DashboardOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, message, Breadcrumb } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

type IMenuItem = {
  key: string;
  label: string;
  icon?: JSX.Element;
  children?: IMenuItem[];
};

type TBreadcrumbItem = {
  label: string;
  key: React.Key;
};

const AppMenu: IMenuItem[] = [
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

/** 找到默认打开的菜单项 */
const findOpenKeys = (menus: IMenuItem[], key: string) => {
  let result: string[] = [];
  const findInfo = (arr: IMenuItem[]) => {
    for (const item of arr) {
      if (key.includes(item.key)) {
        result.push(item.key);
        if (item.children) {
          findInfo(item.children);
        }
      }
    }
  };
  findInfo(menus);
  return result;
};

const findDeepPath = (menus: IMenuItem[], key: string) => {
  let result: any[] = [];

  const findInfo = (arr: IMenuItem[]) => {
    // 数据拍平
    for (const item of arr) {
      const { children, ...info } = item;
      result.push(info);
      if (children) {
        findInfo(children);
      }
    }
  };
  findInfo(menus);
  // 过滤出所有key值被包含的数据
  let tempData = result.filter((item) => key.includes(item.key));
  if (tempData.length > 0) {
    return [{ label: '首页', key: 'admin/dashboard' }, ...tempData];
  }
  return [];
};

const AppLayout = ({ children }: any) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  // 默认展开的 submenu
  const defaultOpenKeys = findOpenKeys(AppMenu, pathname);
  const [breadcrumbItems, setBreadCrumbItems] = useState<TBreadcrumbItem[]>([]);

  useEffect(() => {
    setBreadCrumbItems(findDeepPath(AppMenu, pathname));
  }, [pathname]);
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
          defaultOpenKeys={defaultOpenKeys}
          defaultSelectedKeys={defaultOpenKeys}
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
          <Breadcrumb>
            {breadcrumbItems.map((item) => (
              <Breadcrumb.Item key={item.key}>{item.label}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
