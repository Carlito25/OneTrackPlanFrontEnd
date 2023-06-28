import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import { Layout, Button, Space } from 'antd';
const { Content } = Layout;

function Task() {
    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Navbar />
                    <Content className='content'>
                        <h1>Task</h1>
                        <Button type="primary" /*onClick={}*/>
                            Add Task
                        </Button>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default Task;