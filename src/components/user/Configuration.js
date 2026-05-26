import { Card, Select, Layout, Row, Space, Col, Divider, Button } from "antd";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableComponents from '../resources/TableComponents';

import {
    ExportOutlined,
    ImportOutlined,
    MoneyCollectOutlined,
    ProfileOutlined,
    CaretDownOutlined,
    CalendarOutlined,
    EditOutlined,
    EditFilled,
    DeleteFilled,
    PlusOutlined 
} from "@ant-design/icons";
import Footernav from "../layout/Footer";


const { Content } = Layout;

// const { Meta } = Card;

function Configuration() {

const [contentFormData, setContentFormData] = useState({
    name: "",
  });

    const [loading, setLoading] = useState(true);

    const [isTableLoading, setIsTableLoading] = useState(true);

    const [contents, setContents] = useState(null);

    const [userFormData, setUserFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [usersName, setUsersName] = useState("");
    const userId = localStorage.getItem('user_id');


    const contentAPI = `http://localhost:8000/api/configuration/user_id/${userId}`;
    const userLink = "http://localhost:8000/api/user";


    const fetchUser = async (id) => {
        axios
            .get(userLink + "/" + id)
            .then(function (response) {
                setUsersName(response.data.name);
            })
    }

    const fetchContent = async () => {
        axios
        .get(contentAPI)
        .then(function (response) {
            setContents(response.data);
            setIsTableLoading(false);
            setLoading(false);
        })
        .catch(function (error) {
            console.log(error);
            setLoading(false);
        })
    }

    // const onPanelChange = (value) => {
    //     console.log(value.format('YYYY-MM-DD'));
    // };


    const cardColorStyle = (backgroundColor, textColor) => {
        return {
            background: backgroundColor,
            color: textColor,
        };
    };



    useEffect(() => {
        fetchUser(localStorage.getItem('user_id'));
        fetchContent();
    }, []);

    const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "90%",
      key: "name ",
    },
    {
      title: "Actions",
      dataIndex: "id",
      width: "10%",
      key: "action",
      render: (text) => (
        <Space size='middle'>
          <Button
            type="primary"
            icon={<EditFilled />}
            className='editButton'
            //onClick={() => updateContent(text)}
          ></Button>

          <Button
            type="primary"
            icon={<DeleteFilled />}
            className='deleteButton'
            //onClick={() => deleteContent(text)}
          ></Button>
        </Space>
      )
    },
  ];

    const CustomArrowIcon = () => <CaretDownOutlined style={{ color: 'white' }} />;

    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Navbar />
                    <Content className='content'>
                        <h1>Content Planner</h1>
                        <Row>
                            <Col span={24}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Card
                                        title={
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Space>
                                                    Category
                                                </Space>
                                                <Button
                                                    type="success"
                                                    icon={<PlusOutlined />}
                                                    className='add-config'
                                                    //onClick={() => updateContent(text)}
                                                ></Button>
                                            </div>
                                        }
                                        className="dashboardCard"
                                        loading={loading}
                                        activeTabKey
                                        headStyle={cardColorStyle('#393D5E', 'white')}
                                        bodyStyle={cardColorStyle('#393D5E', 'white')}
                                        bordered={false}
                                    >
                                   <TableComponents
                                        loading={isTableLoading}
                                        columns={columns}
                                        dataSource={contents ? contents.filter(item => item.type === 'category') : []}
                                    />
                                    </Card>

                                    <Card
                                        hoverable
                                        title={
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Space>
                                                    Status
                                                </Space>
                                                <Button
                                                    type="success"
                                                    icon={<PlusOutlined />}
                                                    className='add-config'
                                                    //onClick={() => updateContent(text)}
                                                ></Button>
                                                </div>
                                        }
                                        className="dashboardCard"
                                        loading={loading}
                                        headStyle={cardColorStyle('#393D5E', 'white')}
                                        bodyStyle={cardColorStyle('#393D5E', 'white')}
                                        bordered={false}
                                    >
                                    {/* {tasks.length > 0 ? (
                                        tasks.slice(0, 3).map((task, index) => (
                                            <p key={task.id}>
                                                <b>
                                                    {index + 1}. {task.taskInfo.split(' ').slice(0, 10).join(' ')}
                                                    {task.taskInfo.split(' ').length > 10 ? '...' : ''}
                                                </b>
                                                {task.taskDescription ? ` - ${task.taskDescription.split(' ').slice(0, 20).join(' ')}` : ''}
                                                {task.taskDescription && task.taskDescription.split(' ').length > 10 ? '...' : ''}
                                            </p>
                                        ))
                                    ) : (
                                        <p>You do not have any tasks.</p>
                                    )} */}
                                    </Card>

                                    <Card
                                        hoverable
                                        title={
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Space>
                                                    Channel
                                                </Space>
                                                <Button
                                                    type="success"
                                                    icon={<PlusOutlined />}
                                                    className='add-config'
                                                    //onClick={() => updateContent(text)}
                                                ></Button>
                                            </div>
                                        }
                                        className="dashboardCard"
                                        loading={loading}
                                        headStyle={cardColorStyle('#393D5E', 'white')}
                                        bodyStyle={cardColorStyle('#393D5E', 'white')}
                                        bordered={false}
                                    >
                                    {/* {tasks.length > 0 ? (
                                        tasks.slice(0, 3).map((task, index) => (
                                            <p key={task.id}>
                                                <b>
                                                    {index + 1}. {task.taskInfo.split(' ').slice(0, 10).join(' ')}
                                                    {task.taskInfo.split(' ').length > 10 ? '...' : ''}
                                                </b>
                                                {task.taskDescription ? ` - ${task.taskDescription.split(' ').slice(0, 20).join(' ')}` : ''}
                                                {task.taskDescription && task.taskDescription.split(' ').length > 10 ? '...' : ''}
                                            </p>
                                        ))
                                    ) : (
                                        <p>You do not have any tasks.</p>
                                    )} */}
                                    </Card>
                                </div>

                                <Divider className="dashboardDivider" />

                                {/* <h1 className='subHeading'>Task</h1> */}
                            </Col>
                            {/* <Col span={6} style={{ marginTop: 0, padding: 20 }}>
                                <div>
                                    <Calendar
                                        fullscreen={false}
                                        onPanelChange={onPanelChange}
                                        className="dashboardCalendar"

                                    />
                                </div>
                            </Col> */}
                        </Row>

                    </Content>
                    <Footernav />
                </Layout>
            </Layout>
        </div>
    );
}

export default Configuration;