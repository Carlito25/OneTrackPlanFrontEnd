import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import ModalComponents from '../resources/modal_fields/ModalComponents';
import { Layout, Button, Space } from 'antd';
import { useEffect, useState } from 'react';
import axios from "axios";
import TableComponents from '../resources/TableComponents';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { DeleteSwalConfig } from '../resources/swal/DeleteSwalConfig';
import Swal from 'sweetalert2';
import NotifSwalAlert from '../resources/swal/NotifSwalAler';
import Footernav from '../layout/Footer';
import ContentPlannerModal from '../resources/modal_fields/ContentPlannerModal';


const { Content } = Layout;


function ContentPlanner() {
    const [contentFormData, setContentFormData] = useState({
        date: "",
        category: "",
        description: "",
        status: "",
        channels: "",
        notes: "",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTableLoading, setIsTableLoading] = useState(true);
    const [contents, setContents] = useState(null);

    const [modalTitle, setModalTitle] = useState();

    const apiLink = "http://localhost:8000/api/contentplanner";

    const fetchContent = async () => {
        axios
            .get(apiLink)
            .then(function (response) {
                setContents(response.data);
                setIsTableLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const createContent = () => {
        setContentFormData({
            ...contentFormData,
            date: "",
            category: "",
            description: "",
            status: "",
            channels: "",
            notes: "",
        });
        setModalTitle("Create Content");
        setIsModalOpen(true);
    }


    useEffect(() => {
        fetchContent();
    }, []);

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            width: "10%",
            key: "date",
        },
        {
            title: "Category ",
            dataIndex: "category",
            width: "10%",
            key: "category ",
        },
        {
            title: "Description",
            dataIndex: "description",
            width: "25%",
            key: "description",
        },
        {
            title: "Status",
            dataIndex: "status",
            width: "10%",
            key: "status",
        },
        {
            title: "Channels",
            dataIndex: "channels",
            width: "10%",
            key: "channels",
        },
        {
            title: "Notes",
            dataIndex: "notes",
            width: "25%",
            key: "notes",
        },
        {
            title: "Actions",
            // dataIndex: "notes",
            width: "10%",
            //key: "notes",
        },

    ]
    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Navbar />
                    <Content className='content'>
                        <Button type="primary" onClick={createContent} style={{ marginBottom: '10px' }}>
                            Add Content
                        </Button>
                        <TableComponents
                            loading={isTableLoading}
                            columns={columns}
                            dataSource={contents}
                            className="table"
                        />
                        <ModalComponents
                            modalContent={
                                <ContentPlannerModal
                                    contentFormData={contentFormData}
                                    setContentFormData={setContentFormData}
                                    modalTitle={modalTitle}
                                />
                            }
                            isShownModal={isModalOpen}
                            // handleOk={onSubmit}
                             handleCancel={handleCancel}
                            okText={"Submit"}
                        />
                    </Content>
                    <Footernav />
                </Layout>
            </Layout>
        </div>
    );
}

export default ContentPlanner;