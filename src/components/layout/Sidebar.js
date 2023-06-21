import { Button, Layout, Menu, Row } from 'antd';
import { Link } from "react-router-dom";
import { SettingFilled } from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return { key, icon, children, label };
}

const items = [
    getItem(<Link to="/income">Income</Link>, <SettingFilled />),
    getItem(<Link to="/expenses">Expenses</Link>, <SettingFilled />),
    getItem(<Link to="/expenses">Content Planner</Link>, <SettingFilled />),
    getItem(<Link to="/expenses">Task</Link>, <SettingFilled />),
    getItem(<Link to="/expenses">Time Management</Link>, <SettingFilled />),

];

function Sidebar() {
    return (
        <Sider
      style={{ background: "#897456" }}
      breakpoint="lg"
      collapsedWidth="0"
      width="200"
    >
      <div style={{ paddingBottom: "50px", paddingTop: "50px" }}>
        <Row justify="space-around" align="middle">
        
        </Row>
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        style={{ background: "#897456", color: "white", height:'100%'}}
      />
    </Sider>
    );
}

export default Sidebar;
