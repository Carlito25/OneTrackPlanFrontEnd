import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import { Layout, Button, Space, Card, Typography, Col, Row } from 'antd';
import {
    EditOutlined,
    CheckCircleOutlined
} from "@ant-design/icons";
import { useEffect, useState } from 'react';
import axios from "axios";
import NotifSwalAlert from '../resources/swal/NotifSwalAler';
import ModalComponents from '../resources/modal_fields/ModalComponents';
import TaskModal from '../resources/modal_fields/TaskModal';
import { Link } from "react-router-dom";
import Footernav from '../layout/Footer';
import Swal from 'sweetalert2';


const { Content } = Layout;
const { Text } = Typography;
const Toast = NotifSwalAlert();

function Task() {

    const [taskFormData, setTaskFormData] = useState({
        user_id: "",
        taskInfo: "",
        taskDescription: "",
        date: "",
        task_id: "",
        isCompletedTask: false,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCardLoading, setIsCardLoading] = useState(true);
    const [modalTitle, setModalTitle] = useState();
    const [tasks, setTasks] = useState([]);

    const apiLink = "http://localhost:8000/api/task";
    const userId = localStorage.getItem('user_id');
    const apiUserLink = `http://localhost:8000/api/task/user_id/${userId}`;

    const fetchTask = async () => {
        try {
            const response = await axios.get(apiUserLink);
            setTasks(response.data);
            setIsCardLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const createTask = () => {
        setTaskFormData({
            ...taskFormData,
            taskInfo: "",
            taskDescription: "",
            date: "",
            task_id: "",
            isCompletedTask: false,
            user_id: localStorage.getItem('user_id'),

        });
        setModalTitle("Create Task");
        setIsModalOpen(true);
    }

    const updateTask = async (id) => {
        axios
            .get(apiLink + "/" + id)
            .then(function (response) {
                setTaskFormData({
                    ...taskFormData,
                    task_id: response.data.id,
                    taskInfo: response.data.taskInfo,
                    taskDescription: response.data.taskDescription,
                    date: response.data.date,
                    user_id: response.data.user_id,
                })
                setModalTitle("Update Task");
                setIsModalOpen(true);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const completedTask = (id) => {
        axios
            .put(apiLink + "/" + id)
            .then(() => {
                setIsModalOpen(false);
                fetchTask();
            })
            .catch((error) => {
                console.error("Error Updating Task", error);
            })
    }

    const onSubmit = () => {
        const payload = {
            ...taskFormData,
            user_id: localStorage.getItem('user_id')
          };
        axios
            .post(apiLink, payload)
            .then(function (response) {
                console.log(response);
                Toast.fire({
                    icon: 'success',
                    title: response.data.status,
                    text: response.data.message,
                });
                setIsModalOpen(false);
                setIsCardLoading(true);
                fetchTask();
            })
            .catch(function (error) {
                console.log(error);
                if (error.response && error.response.status === 422) {
                    Swal.fire({
                      icon: 'error',
                      title: error.response.data.message,
                      text: 'Make sure everything is filled up!',
                    })
                  }
            })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchTask();
    }, []);

    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Navbar />
                    <Content className='content'>
                        <Row>
                            <Col span={12}>
                                <Button type="primary" onClick={createTask}>
                                    Add Task
                                </Button>
                            </Col>
                            <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Link to={"/CompletedTask"}>
                                    <Button
                                        type='primary'
                                        className='viewCompletedTaskButton'
                                        ghost
                                    >
                                    View Completed Task
                                </Button>
                            </Link>
                        </Col>
                    </Row>

                    {tasks.map(task => (
                        <Card
                            key={task.id}
                            hoverable
                            title={
                                <Space>
                                    <Text className='taskTitle'>
                                        {task.taskInfo}
                                    </Text>
                                </Space>
                            }

                            className="taskCard"
                            loading={isCardLoading}
                            activeTabKeys
                        >
                            <Row className='cardContent'>
                                <Col span={12}>
                                    <Col className='taskDescription'>
                                        <Text style={{ color: 'white' }}>{task.taskDescription}</Text>
                                    </Col>
                                    <Col>
                                        <Text style={{ color: '#F9F871' }}>Due Date: {task.date}</Text>
                                    </Col>
                                </Col>
                                <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        icon={<EditOutlined />}
                                        className='editButton'
                                        style={{ marginRight: '10px' }}
                                        type='primary'
                                        onClick={() => updateTask(task.id)}
                                    ></Button>
                                    <Button
                                        icon={<CheckCircleOutlined />}
                                        style={{ backgroundColor: 'green', }}
                                        className='completeTaskButton'
                                        type='primary'
                                        onClick={() => completedTask(task.id)}
                                    ></Button>
                                </Col>
                            </Row>

                        </Card>
                    ))}
                    <ModalComponents
                        modalContent={
                            <TaskModal
                                taskFormData={taskFormData}
                                setTaskFormData={setTaskFormData}
                                modalTitle={modalTitle}
                            />
                        }
                        isShownModal={isModalOpen}
                        handleOk={onSubmit}
                        handleCancel={handleCancel}
                        okText={"Submit"}
                    />
                </Content>
                <Footernav />
            </Layout>
        </Layout>
        </div >
    );
}

export default Task;