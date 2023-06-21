import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import ModalComponents from '../resources/modal_fields/ModalComponents';
import ExpensesModal from '../resources/modal_fields/ExpensesModal';
import { useState, useEffect } from 'react';
import { Layout, Space, Button, } from 'antd';
import axios from "axios";
import TableComponents from '../resources/TableComponents';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

const { Content } = Layout;

function Expenses() {
    const [expensesFormData, setExpensesFormData] = useState({
        date: "",
        expenses: "",
        amount: "",
        expenses_id: "",
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isTableLoading, setIsTableLoading] = useState(true);
    const [expenses, setExpenses] = useState(null);

    const apiLink = "http://localhost:8000/api/expenses";

    const fetchExpenses = async () => {
        axios
            .get(apiLink)
            .then(function (response) {
                setExpenses(response.data);
                setIsTableLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const createExpenses = () => {
        setExpensesFormData({
            ...expensesFormData,
            date: "",
            expenses: "",
            amount: "",
            expenses_id: "",
        });
        setIsModalOpen(true);
    }

    const onSubmit = () => {
        axios
            .post(apiLink, expensesFormData)
            .then(function (response) {
                console.log(response);
                setIsModalOpen(false);
                setIsTableLoading(true);
                fetchExpenses();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            width: "33%",
            key: "date",
        },
        {
            title: "Expenses",
            dataIndex: "expenses",
            width: "33%",
            key: "expenses",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            width: "33%",
            key: "amount",
        },
        {
            title: "",
            dataIndex: "id",
            width: "4%",
            key: "action",
            render: () => (
              <Space size='middle'>
                <Button
                  type="primary"
                  icon={<EditFilled />}
                  className='editButton'
                ></Button>
      
                <Button
                  type="primary"
                  icon={<DeleteFilled />}
                  className='deleteButton'
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
                        <h1>Expenses</h1>
                        <Button type="primary" onClick={createExpenses}>
                            Add Expenses
                        </Button>
                        <TableComponents
                            loading={isTableLoading}
                            columns={columns}
                            dataSource={expenses}
                            className="table"
                        />
                        <ModalComponents
                            modalContent={
                                <ExpensesModal 
                                expensesFormData={expensesFormData}
                                setExpensesFormData={setExpensesFormData}
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

export default Expenses;
