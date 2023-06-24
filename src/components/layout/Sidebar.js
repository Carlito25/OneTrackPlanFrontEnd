import { Button, Layout, Menu, Row } from 'antd';
import { Link } from "react-router-dom";
import {
  ExportOutlined,
  ImportOutlined,
  ProfileOutlined,
  CalendarOutlined,
  FieldTimeOutlined
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;


function getItem(label, key, icon, children) {
  return { key, icon, children, label };
}

const items = [
  getItem(<Link to="/income">Income</Link>, "item0", <ImportOutlined className="sidenav-menu-icons" style={{ fontSize: '20px'}}/>),
  getItem(<Link to="/expenses">Expenses</Link>, "item1", <ExportOutlined className="sidenav-menu-icons" style={{ fontSize: '20px'}}/>),
  getItem(<Link to="/expenses">Content Planner</Link>, "item2", <CalendarOutlined className="sidenav-menu-icons" style={{ fontSize: '20px'}}/>),
  getItem(<Link to="/expenses">Task</Link>, "item3", <ProfileOutlined className="sidenav-menu-icons" style={{ fontSize: '20px'}}/>),
  getItem(<Link to="/expenses">Time Management</Link>, "item4",<FieldTimeOutlined className="sidenav-menu-icons" style={{ fontSize: '20px'}}/>),

];

function Sidebar() {
  return (
    <Sider
      style={{ background: "#897456" }}
      breakpoint="lg"
      collapsedWidth="0"
      width="250"
    >
      <div style={{ paddingBottom: "50px", paddingTop: "50px" }}>
        <Row justify="space-around" align="middle">

        </Row>
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        style={{ background: "#897456", color: "white", height: '100%' }}
        className='sidebar-menu'
      />
    </Sider>
  );
}

export default Sidebar;
