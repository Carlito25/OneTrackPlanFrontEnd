import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import ModalComponents from '../resources/modal_fields/ModalComponents';
import { Layout, Button, Space, Badge, Row, Col, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import axios from "axios";
import TableComponents from '../resources/TableComponents';
import { EditFilled, DeleteFilled, CaretDownOutlined } from '@ant-design/icons';
import { DeleteSwalConfig } from '../resources/swal/DeleteSwalConfig';
import Swal from 'sweetalert2';
import NotifSwalAlert from '../resources/swal/NotifSwalAler';
import Footernav from '../layout/Footer';
import ContentPlannerModal from '../resources/modal_fields/ContentPlannerModal';
import { Link } from 'react-router-dom';

const Toast = NotifSwalAlert();
const { Content } = Layout;


function ContentPlanner() {
  const [contentFormData, setContentFormData] = useState({
    user_id: "",
    date: "",
    category: "",
    description: "",
    status: "",
    channels: "",
    notes: "",
    content_id: "",
  });

  const [searchedText, setSearchedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [contents, setContents] = useState(null);

  const [modalTitle, setModalTitle] = useState();

  const [selectedValue, setSelectedValue] = useState('All Content');

  const apiLink = "http://localhost:8000/api/contentplanner";
  const userId = localStorage.getItem('user_id');
  const apiUserLink = `http://localhost:8000/api/contentplanner/user_id/${userId}`;

  const apiContentWeekly = `http://localhost:8000/api/contentplannerWeekly/user_id/${userId}`;
  const apiContentMonthly = `http://localhost:8000/api/contentplannerMonthly/user_id/${userId}`;


  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const fetchContent = async () => {
    axios
      .get(apiUserLink)
      .then(function (response) {
        setContents(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const fetchContentWeekly = async () => {
    axios
      .get(apiContentWeekly)
      .then(function (response) {
        setContents(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  const fetchContentMonthly = async () => {
    axios
      .get(apiContentMonthly)
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
      content_id: "",
      user_id: localStorage.getItem('user_id'),
    });
    setModalTitle("Create Content");
    setIsModalOpen(true);
  }

  const updateContent = async (id) => {
    axios
      .get(apiLink + "/" + id)
      .then(function (response) {
        setContentFormData({
          ...contentFormData,
          content_id: response.data.id,
          date: response.data.date,
          category: response.data.category,
          description: response.data.description,
          status: response.data.status,
          channels: response.data.channels,
          notes: response.data.notes,
          user_id: response.data.user_id,
        })
        setModalTitle("Update Income");
        setIsModalOpen(true);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const deleteContent = (id) => {
    Swal.fire(DeleteSwalConfig)
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(apiLink + "/" + id)
            .then(() => {
              setIsModalOpen(false);
              fetchContent();
            })
        }
      })
      .catch((error) => {
        console.error("Error deleting Income", error);
      })
  }


  const onSubmit = () => {
    const payload = {
      ...contentFormData,
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
        setIsTableLoading(true);
        fetchContent();
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


  useEffect(() => {
    if (selectedValue === 'Weekly') {
      fetchContentWeekly();
    }
    else if (selectedValue === 'Monthly') {
      fetchContentMonthly();
    }
    else if (selectedValue === 'All Content') {
      fetchContent();
    }
  }, [selectedValue]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      width: "10%",
      key: "date",
      sorter: (a, b) => a.date.localeCompare(b.date),
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.date).toLowerCase().includes(value.toLowerCase()) ||
          String(record.category).toLowerCase().includes(value.toLowerCase()) ||
          String(record.description).toLowerCase().includes(value.toLowerCase()) ||
          String(record.status).toLowerCase().includes(value.toLowerCase()) ||
          String(record.channels).toLowerCase().includes(value.toLowerCase()) ||
          String(record.notes).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Category ",
      dataIndex: "category",
      width: "10%",
      key: "category ",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "25%",
      key: "description",
    },
    {

      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      key: 'status',
      render: (status) => {
        let color = '';
        let text = '';

        switch (status) {
          case 'Draft':
            color = '#fadb14';
            text = 'Draft';
            break;
          case 'Scheduled':
            color = '#1890ff';
            text = 'Scheduled';
            break;
          case 'Published':
            color = '#52c41a';
            text = 'Published';
            break;
          default:
            color = '#d9d9d9';
            text = 'Unknown';
            break;
        }
        return (
          <Badge color={color} text={text} style={{ color: '#fff' }} />
        );
      },
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Channels",
      dataIndex: "channels",
      width: "10%",
      key: "channels",
      sorter: (a, b) => a.channels.localeCompare(b.channels),
    },
    {
      title: "Notes",
      dataIndex: "notes",
      width: "25%",
      key: "notes",
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
            onClick={() => updateContent(text)}
          ></Button>

          <Button
            type="primary"
            icon={<DeleteFilled />}
            className='deleteButton'
            onClick={() => deleteContent(text)}
          ></Button>
        </Space>
      )
    },
  ];

  const CustomArrowIcon = () => <CaretDownOutlined style={{ color: '#00B3B4' }} />;


  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <Navbar />
          <Content className='content'>
            <Row>
              <Col span={9}>
                <Button type="primary" onClick={createContent} style={{ marginBottom: '15px' , marginRight: '10px' }}>
                  Add Content
                </Button>

                <Select
                  type="primary"
                  ghost
                  suffixIcon={<CustomArrowIcon />}
                  className="financeSelectTable"
                  style={{ width: 160 }}
                  value={selectedValue}
                  onChange={handleChange}
                  options={[
                    { value: 'Weekly', label: 'Previous 7 days' },
                    { value: 'Monthly', label: 'Previous 30 days' },
                    { value: 'All Content', label: 'All Content' },
                  ]
                  }
                />

              </Col>
              <Col span={6}>
                <Input.Search
                  placeholder="Search"
                  onSearch={(value) => {
                    setSearchedText(value);
                  }}
                  onChange={(e) => {
                    setSearchedText(e.target.value);
                  }}
                />
              </Col>
              <Col span={9} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link to={"/ScheduledContent"}>
                  <Button
                    type="primary"
                    style={{ marginBottom: '10px' }}
                    className='viewCompletedTaskButton'
                    ghost
                  >
                    View Published Content
                  </Button>
                </Link>
              </Col>
            </Row>
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
              handleOk={onSubmit}
              handleCancel={handleCancel}
              okText={"Submit"}
              style={{
                top: 20,
              }}
            />
          </Content>
          <Footernav />
        </Layout>
      </Layout>
    </div>
  );
}

export default ContentPlanner;