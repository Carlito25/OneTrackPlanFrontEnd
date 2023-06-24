import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import ModalComponents from '../resources/modal_fields/ModalComponents';
import IncomeModal from '../resources/modal_fields/IncomeModal';
import { Layout, Button, Space } from 'antd';
import { useEffect, useState } from 'react';
import axios, { Axios } from "axios";
import TableComponents from '../resources/TableComponents';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { DeleteSwalConfig } from '../resources/swal/DeleteSwalConfig';
import Swal from 'sweetalert2';

const { Content } = Layout;

function Income() {
  const [incomeFormData, setIncomeFormData] = useState({
    date: "",
    income: "",
    amount: "",
    income_id: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isTableLoading, setIsTableLoading] = useState(true);
  const [incomes, setIncomes] = useState(null);
  const [modalTitle, setModalTitle] = useState();

  const apiLink = "http://localhost:8000/api/income";

  const fetchIncome = async () => {
    axios
      .get(apiLink)
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
    });
    setIsModalOpen(true);
  }

  const updateIncome = async (id) => {
    axios
      .get(apiLink + "/" + id)
      .then(function (response) {
        setIncomeFormData({
          ...incomeFormData,
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
    axios
      .post(apiLink, incomeFormData)
      .then(function (response) {
        console.log(response);
        setIsModalOpen(false);
        setIsTableLoading(true);
        fetchIncome();
      })
      .catch(function (error) {
        console.log(error);
      })
  }
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
    },
    {
      title: "Income",
      dataIndex: "income",
      width: "32%",
      key: "income",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "32%",
      key: "amount",
    },
    {
      title: "",
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
            <h1>Income</h1>
            <Button type="primary" onClick={createIncome}>
              Add Income
            </Button>
            <TableComponents
              loading={isTableLoading}
              columns={columns}
              dataSource={incomes}
              className="table"
            />
            <ModalComponents
              modalContent={
                <IncomeModal
                  incomeFormData={incomeFormData}
                  setIncomeFormData={setIncomeFormData}
                  modalTitle = {modalTitle}
                />
              }
              isShownModal={isModalOpen}
              handleOk={onSubmit}
              handleCancel={handleCancel}
              okText={"Submit"}
            />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Income;
