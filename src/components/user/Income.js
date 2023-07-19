import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import Footernav from '../layout/Footer';
import ModalComponents from '../resources/modal_fields/ModalComponents';
import IncomeModal from '../resources/modal_fields/IncomeModal';
import { Layout, Button, Space, Row, Col, Input } from 'antd';
import { useEffect, useState } from 'react';
import axios from "axios";
import TableComponents from '../resources/TableComponents';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { DeleteSwalConfig } from '../resources/swal/DeleteSwalConfig';
import Swal from 'sweetalert2';
import NotifSwalAlert from '../resources/swal/NotifSwalAler';
import React from 'react'

const { Content } = Layout;
const Toast = NotifSwalAlert();

function Income() {
  const [incomeFormData, setIncomeFormData] = useState({
    user_id: "",
    date: "",
    income: "",
    amount: "",
    income_id: "",
  });
  const [searchedText, setSearchedText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userID, setUserID] = useState(0);

  const [isTableLoading, setIsTableLoading] = useState(true);
  const [incomes, setIncomes] = useState(null);
  const [modalTitle, setModalTitle] = useState();

  const apiLink = "http://localhost:8000/api/income";
  const userId = localStorage.getItem('user_id');
  const apiUserLink = `http://localhost:8000/api/incomes/user_id/${userId}`;

  
  // const fetchUserID = async () => {
  //   axios
  //     .get(apiLink)
  //     .then(function (response) {
  //       const userID = localStorage.setItem('user_id', response.data.user_id);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  // }

  const fetchIncome = async () => {
    axios
      .get(apiUserLink)
      .then(function (response) {
        setIncomes(response.data);
        setIsTableLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  const createIncome = () => {

    setIncomeFormData({
      ...incomeFormData,
      date: "",
      income: "",
      amount: "",
      income_id: "",
      user_id: localStorage.getItem('user_id'),
    });
    setModalTitle("Create Income");
    setIsModalOpen(true);
  }

  const updateIncome = async (id) => {
    axios
      .get(apiLink + "/" + id)
      .then(function (response) {
        setIncomeFormData({
          ...incomeFormData,
          user_id: response.data.user_id,
          income_id: response.data.id,
          date: response.data.date,
          income: response.data.income,
          amount: response.data.amount,
        })
        setModalTitle("Update Income");
        setIsModalOpen(true);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const deleteIncome = (id) => {
    Swal.fire(DeleteSwalConfig)
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(apiLink + "/" + id)
            .then(() => {
              setIsModalOpen(false);
              fetchIncome();
            })
        }
      })
      .catch((error) => {
        console.error("Error deleting Income", error);
      })
  }

  const onSubmit = () => {
    const payload = {
      ...incomeFormData,
      user_id: localStorage.getItem('user_id')
    };
  
    axios.post(apiLink, payload)
      .then(function (response) {
        console.log(response);
        Toast.fire({
          icon: 'success',
          title: response.data.status,
          text: response.data.message,
        });
        setIsModalOpen(false);
        setIsTableLoading(true);
        fetchIncome();
      })
      .catch(function (error) {
        console.log(error);
        if (error.response && error.response.status === 422) {
          Swal.fire({
            icon: 'error',
            title: error.response.data.message,
            text: 'Make sure everything is filled up!',
          });
        }
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      width: "32%",
      key: "date",
      sorter: (a, b) => a.date.localeCompare(b.date),
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        return (
          String(record.date).toLowerCase().includes(value.toLowerCase()) ||
          String(record.income).toLowerCase().includes(value.toLowerCase()) ||
          String(record.amount).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Income",
      dataIndex: "income",
      width: "32%",
      key: "income",
      sorter: (a, b) => a.income.localeCompare(b.income),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "32%",
      key: "amount",
      render: (value) => `₱${value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
      })}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Actions",
      dataIndex: "id",
      width: "4%",
      key: "action",
      render: (text) => (
        <Space size='middle'>
          <Button
            type="primary"
            icon={<EditFilled />}
            className='editButton'
            onClick={() => updateIncome(text)}
          ></Button>

          <Button
            type="primary"
            icon={<DeleteFilled />}
            className='deleteButton'
            onClick={() => deleteIncome(text)}
          ></Button>
        </Space>
      )
    }
  ]


  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
          <Navbar />
          <Content className='content'>
            <Row justify="space-between">
              <Col span={18}>
                <Button type="primary" onClick={createIncome} style={{ marginBottom: '10px' }}>
                  Add Income
                </Button>
              </Col>
              <Col span={6} align="end">
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
            </Row>
            <TableComponents
              loading={isTableLoading}
              columns={columns}
              dataSource={incomes}
            />
            <ModalComponents
              modalContent={
                <IncomeModal
                  incomeFormData={incomeFormData}
                  setIncomeFormData={setIncomeFormData}
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
    </div>
  );
}

export default Income;
