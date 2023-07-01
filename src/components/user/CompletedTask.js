import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import { Layout, Button, Space, Card, Typography, Col, Row } from 'antd';
import {
    DeleteFilled
} from "@ant-design/icons";
import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { message } from 'antd';
import { DeleteSwalConfig } from '../resources/swal/DeleteSwalConfig';
import Swal from 'sweetalert2';

const { Content } = Layout;
const { Text } = Typography;

function CompletedTask() {

    const [isCardLoading, setIsCardLoading] = useState(true);
    const [tasksCompleted, setTasksCompleted] = useState([]);

    const apiLink = "http://localhost:8000/api/task";
    const taskCompletedApiLink = "http://localhost:8000/api/taskCompleted";

    // const deleteCompletedTask = (id) => {
    //     axios
    //       .delete(`http://localhost:8000/api/task/${id}`)
    //       .then((response) => {
    //         if (response.data.success) {
    //           message.success('Record deleted successfully');
    //           fetchTaskCompleted();
    //         } else {
    //           message.error(response.data.message);
    //         }
    //       })
    //       .catch((error) => {
    //         console.error('Error deleting record', error);
    //         message.error('Failed to delete record');
    //       });
    //   };

      const deleteCompletedTask = (id) => {
        Swal.fire(DeleteSwalConfig)
          .then((result) => {
            if (result.isConfirmed) {
              axios
                .delete(apiLink + "/" + id)
                .then(() => {
                    fetchTaskCompleted();
                })
            }
          })
          .catch((error) => {
            console.error("Error deleting Income", error);
          })
      }


    const fetchTaskCompleted = async () => {
        try {
            const response = await axios.get(taskCompletedApiLink);
            console.log(response.data);
            setTasksCompleted(response.data.completedTask);
            setIsCardLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTaskCompleted();
    }, []);

    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Navbar />
                    <Content className='content'>
                        <h1>Completed Task</h1>
                        <Row>
                            <Col span={12}>
                                <Button type="primary" danger className='deleteButton'>
                                    Clear Completed Task
                                </Button>
                            </Col>
                            <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Link to={"/Task"}>
                                    <Button type="primary" className='viewCompletedTaskButton' ghost>
                                        Back to Task
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                        {tasksCompleted.map(task => (
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
                                            <Text>{task.taskDescription}</Text>
                                        </Col>
                                        <Col>
                                            <Text type="warning">Due Date: {task.date}</Text>
                                        </Col>
                                    </Col>
                                    <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button
                                            icon={<DeleteFilled />}
                                            style={{ backgroundColor: 'red', }}
                                            className='deleteButton'
                                            type='primary'
                                            onClick={() => deleteCompletedTask(task.id)}
                                        ></Button>
                                    </Col>
                                </Row>

                            </Card>
                        ))}

                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default CompletedTask;