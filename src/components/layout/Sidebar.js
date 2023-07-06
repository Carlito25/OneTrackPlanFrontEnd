import { Layout, Menu, Row, Image } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  ExportOutlined,
  ImportOutlined,
  ProfileOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

import { useState } from 'react';
import Logo from '../../image/onetrackplanlogo.png';

const { Sider } = Layout;

const menuItems = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardOutlined className="sidenav-menu-icons" style={{ fontSize: '20px' }} />,
    path: '/dashboard',
  },
  {
    key: 'income',
    label: 'Income',
    icon: <ImportOutlined className="sidenav-menu-icons" style={{ fontSize: '20px' }} />,
    path: '/income',
  },
  {
    key: 'expenses',
    label: 'Expenses',
    icon: <ExportOutlined className="sidenav-menu-icons" style={{ fontSize: '20px' }} />,
    path: '/expenses',
  },
  {
    key: 'contentplanner',
    label: 'Content Planner',
    icon: <CalendarOutlined className="sidenav-menu-icons" style={{ fontSize: '20px' }} />,
    path: '/contentplanner',
  },
  {
    key: 'task',
    label: 'Task',
    icon: <ProfileOutlined className="sidenav-menu-icons" style={{ fontSize: '20px' }} />,
    path: '/task',
  },
  {
    key: 'time-management',
    label: 'Time Management',
    icon: <FieldTimeOutlined className="sidenav-menu-icons" style={{ fontSize: '20px' }} />,
    path: '/time-management',
  },
];

function Sidebar() {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState('');

  useState(() => {
    const foundMenuItem = menuItems.find((item) => item.path === location.pathname);
    if (foundMenuItem) {
      setSelectedKey(foundMenuItem.key);
    }
  }, [location]);

  return (
    <Sider style={{ background: '#615460' }} breakpoint="lg" collapsedWidth="0" width="250">
      <div style={{ paddingBottom: '30px', paddingTop: '30px' }}>
        <Row justify="space-around" align="middle">
          <Image width="50%" src={Logo} preview={false} />
        </Row>
      </div>
      <Menu
        mode="inline"
        style={{ background: '#615460', color: 'white', height: '50%' }}
        className="sidebar-menu"
        onClick={({ key }) => setSelectedKey(key)}
        selectedKeys={[selectedKey]}
      >
        {menuItems.map((menuItem) => (
          <Menu.Item
            key={menuItem.key}
            icon={menuItem.icon}
          >
            <Link to={menuItem.path}>{menuItem.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
}

export default Sidebar;
