import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import ModalComponents from '../resources/modal_fields/ModalComponents';
import ExpensesModal from '../resources/modal_fields/ExpensesModal';
import { useState, useEffect } from 'react';
import { Layout, Space, Button, Row, Col, Input } from 'antd';
import axios from "axios";
import TableComponents from '../resources/TableComponents';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { DeleteSwalConfig } from '../resources/swal/DeleteSwalConfig';
import Swal from 'sweetalert2';
import NotifSwalAlert from '../resources/swal/NotifSwalAler';
import { Footer } from 'antd/es/layout/layout';
import Footernav from '../layout/Footer';

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
    const [searchedText, setSearchedText] = useState("");
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
        setModalTitle("Create Expenses");
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
            .catch(function (error) {
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
                    icon: "success",
                    title: response.data.status,
                    text: response.data.message,
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
            sorter: (a, b) => a.date.localeCompare(b.date),
            filteredValue: [searchedText],
            onFilter: (value, record) => {
                return (
                    String(record.date).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.expenses).toLowerCase().includes(value.toLowerCase()) ||
                    String(record.amount).toLowerCase().includes(value.toLowerCase())
                );
            },
        },
        {
            title: "Expenses",
            dataIndex: "expenses",
            width: "33%",
            key: "expenses",
            sorter: (a, b) => a.date.localeCompare(b.date),
        },
        {
            title: "Amount",
            dataIndex: "amount",
            width: "33%",
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
                        <Row justify="space-between">
                            <Col span={18}>
                                <Button type="primary" onClick={createExpenses} style={{ marginBottom: '10px' }}>
                                    Add Expenses
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
                            dataSource={expenses}
                            className="financetable"
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
                    <Footernav />
                </Layout>
            </Layout>
        </div>
    );
}

export default Expenses;
