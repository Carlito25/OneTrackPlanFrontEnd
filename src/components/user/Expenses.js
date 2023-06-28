import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import ModalComponents from '../resources/modal_fields/ModalComponents';
import ExpensesModal from '../resources/modal_fields/ExpensesModal';
import { useState, useEffect } from 'react';
import { Layout, Space, Button, } from 'antd';
import axios  from "axios";
import TableComponents from '../resources/TableComponents';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { DeleteSwalConfig } from '../resources/swal/DeleteSwalConfig';
import Swal from 'sweetalert2';
import NotifSwalAlert from '../resources/swal/NotifSwalAler';

const { Content } = Layout;
const Toast = NotifSwalAlert();

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
    const [modalTitle, setModalTitle] = useState(null);

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

    const updateExpenses = async (id) => {
        axios
            .get(apiLink + "/" + id)
            .then(function (response) {
                setExpensesFormData({
                    ...expensesFormData,
                    date: response.data.date,
                    expenses: response.data.expenses,
                    amount: response.data.amount,
                    expenses_id: response.data.id,
                })
                setModalTitle("Update Expenses");
                setIsModalOpen(true);
            })
            .catch(function(error){
                console.log(error);
            })

    }

    const deleteExpenses = (id) => {
        Swal.fire(DeleteSwalConfig)
            .then((result) => {
                if (result.isConfirmed) {
                    axios
                        .delete(apiLink + "/" + id)
                        .then(() => {
                            console.log(apiLink + "/" + id + " is Delete Success")
                            setIsModalOpen(false);
                            fetchExpenses();
                        })
                }
            })
            .catch((error) => {
                console.error("Error deleting Expenses", error);
            })
    }

    const onSubmit = () => {
        axios
            .post(apiLink, expensesFormData)
            .then(function (response) {
                console.log(response);
                Toast.fire({
                    icon:"success",
                    title:response.data.status,
                    text:response.data.message,
                });
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
            render: (value) => `₱${value.toLocaleString('en-US', {
                minimumFractionDigits: 2,
              })}`
        },
        {
            title: "",
            dataIndex: "id",
            width: "4%",
            key: "action",
            render: (id) => (
                <Space size='middle'>
                    <Button
                        type="primary"
                        icon={<EditFilled />}
                        className='editButton'
                        onClick={() => updateExpenses(id)}
                    ></Button>

                    <Button
                        type="primary"
                        icon={<DeleteFilled />}
                        className='deleteButton'
                        onClick={() => deleteExpenses(id)}
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
                                    modalTitle={modalTitle}
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
