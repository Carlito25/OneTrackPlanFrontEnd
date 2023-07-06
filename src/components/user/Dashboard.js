import { Card, Select, Layout, Row, Space } from "antd";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    ExportOutlined,
    ImportOutlined,
    MoneyCollectOutlined,
    ProfileOutlined,
    CaretDownOutlined,
} from "@ant-design/icons";
import Footernav from "../layout/Footer";


const { Content } = Layout;
// const { Meta } = Card;

function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [incomeTotal, setincomeTotal] = useState(0);
    const [expensesTotal, setExpensesTotal] = useState(0);
    const [savingsTotal, setSavingsTotal] = useState(0);

    const [expensesWeeklyTotal, setExpensesWeeklyTotal] = useState(0);
    const [incomeWeeklyTotal, setIncomeWeeklyTotal] = useState(0);

    const [incomeDailyTotal, setIncomeDailyTotal] = useState(0);
    const [expensesDailyTotal, setExpensesDailyTotal] = useState(0);

    const [selectedValue, setSelectedValue] = useState('Monthly');

    const [tasks, setTasks] = useState([]);


    const incomeTotalLink = 'http://localhost:8000/api/incomeMonthlyTotal/';
    const expensesMonthlyTotalLink = 'http://localhost:8000/api/expensesMonthlyTotal';

    const expensesWeeklyTotalLink = 'http://localhost:8000/api/expensesWeeklyTotal';
    const incomeWeeklyTotalLink = 'http://localhost:8000/api/incomeWeeklyTotal';

    const expensesDailyTotalLink = 'http://localhost:8000/api/expensesDailyTotal';
    const incomeDailyTotalLink = 'http://localhost:8000/api/incomeDailyTotal';

    const taskLink = "http://localhost:8000/api/task";

    const handleChange = (value) => {
        setSelectedValue(value);
    };
    const fetchTask = async () => {
        // try {
        //     const response = await axios.get(taskLink)
        //     setLoading(false);
        //     setTasks(response.data);
        // } catch (error) {
        //     console.log(error);
        // }

        axios
            .get(taskLink)
            .then(function (response) {
                setLoading(false);
                setTasks(response.data);
            })


    }


    const fetchIncomeTotal = () => {
        axios
            .get(incomeTotalLink)
            .then(function (response) {
                setLoading(false);
                setincomeTotal(response.data.incomeTotal);
            })
    }

    const fetchExpensesTotal = () => {
        axios
            .get(expensesMonthlyTotalLink)
            .then(function (response) {
                setLoading(false);
                setExpensesTotal(response.data.expensesMonthlyTotal);
            })
    }

    const fetchWeeklyExpensesTotal = () => {
        axios
            .get(expensesWeeklyTotalLink)
            .then(function (response) {
                setLoading(false);
                setExpensesWeeklyTotal(response.data.expensesWeeklyTotal);
            })
    }

    const fetchWeeklyIncomeTotal = () => {
        axios
            .get(incomeWeeklyTotalLink)
            .then(function (response) {
                setLoading(false);
                setIncomeWeeklyTotal(response.data.incomeWeeklyTotal);
            })
    }

    const fetchDailyIncomeTotal = () => {
        axios
            .get(incomeDailyTotalLink)
            .then(function (response) {
                setLoading(false);
                setIncomeDailyTotal(response.data.incomeDailyTotal);
            })
    }

    const fetchDailyExpensesTotal = () => {
        axios
            .get(expensesDailyTotalLink)
            .then(function (response) {
                setLoading(false);
                setExpensesDailyTotal(response.data.expensesDailyTotal);
            })
    }





    const formatCurrency = (value) => {
        return value.toLocaleString('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2
        });
    };

    const formattedIncomeTotal = formatCurrency(incomeTotal);
    const formattedExpensesTotal = formatCurrency(expensesTotal);

    const formattedExpensesWeeklyTotal = formatCurrency(expensesWeeklyTotal);
    const formattedIncomeWeeklyTotal = formatCurrency(incomeWeeklyTotal);

    const formattedIncomeDailyTotal = formatCurrency(incomeDailyTotal);
    const formattedExpensesDailyTotal = formatCurrency(expensesDailyTotal);

    const formattedSavingsTotal = formatCurrency(savingsTotal);



    const cardColorStyle = (backgroundColor, textColor) => {
        return {
            background: backgroundColor,
            color: textColor,
        };
    };

    const getSavingsTotal = () => {
        if (selectedValue === "Weekly") {
            return setSavingsTotal(incomeWeeklyTotal - expensesWeeklyTotal);
        }
        else if (selectedValue === "Monthly") {

            return setSavingsTotal(incomeTotal - expensesTotal);
        }
        else if (selectedValue === "Daily") {
            return setSavingsTotal(incomeDailyTotal - expensesDailyTotal);
        }
    }

    useEffect(() => {
        fetchIncomeTotal();
        fetchExpensesTotal();
        fetchWeeklyExpensesTotal();
        fetchWeeklyIncomeTotal();
        fetchDailyIncomeTotal();
        fetchDailyExpensesTotal();
        fetchTask();
    }, []);

    useEffect(() => {
        getSavingsTotal();
    }, [incomeTotal, expensesTotal, selectedValue])

    const CustomArrowIcon = () => <CaretDownOutlined style={{ color: 'white' }} />;
    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Navbar />
                    <Content className='content'>
                        <h1 className='subHeading'>Finance</h1>
                        <Select
                            suffixIcon={<CustomArrowIcon />}
                            className="financeSelect"
                            style={{ width: 160 }}
                            value={selectedValue}
                            onChange={handleChange}
                            options={[
                                { value: 'Weekly', label: 'Previous 7 days' },
                                { value: 'Monthly', label: 'Previous 30 days' },
                                { value: 'Daily', label: 'Today' },
                            ]
                            }
                        />
                        <Row gutter={16}>
                            <Card
                                hoverable
                                title={
                                    <Space>
                                        <ImportOutlined />
                                        Your Income
                                    </Space>
                                }
                                className="dashboardCard"
                                loading={loading}
                                activeTabKey
                                headStyle={cardColorStyle('#615460', 'white')}
                                bodyStyle={cardColorStyle('#615460', '#1C1C2A')}
                                bordered={false} style={{ width: 300 }}
                            >
                                <p className="financeNumbers">
                                    {selectedValue === 'Weekly' && formattedIncomeWeeklyTotal}
                                    {selectedValue === 'Monthly' && formattedIncomeTotal}
                                    {selectedValue === 'Daily' && formattedIncomeDailyTotal}
                                </p>


                            </Card>
                            <Card
                                hoverable
                                title={
                                    <Space>
                                        <ExportOutlined />
                                        Your Expenses
                                    </Space>
                                }
                                className="dashboardCard"
                                loading={loading}
                                headStyle={cardColorStyle('#615460', 'white')}
                                bodyStyle={cardColorStyle('#615460', '#1C1C2A')}
                                bordered={false} style={{ width: 300 }}
                            >
                                <p className="financeNumbers">
                                    {selectedValue === 'Weekly' && formattedExpensesWeeklyTotal}
                                    {selectedValue === 'Monthly' && formattedExpensesTotal}
                                    {selectedValue === 'Daily' && formattedExpensesDailyTotal}
                                </p>

                            </Card>

                            <Card
                                hoverable
                                title={
                                    <Space>
                                        <MoneyCollectOutlined />
                                        Your Savings
                                    </Space>
                                }
                                className="dashboardCard"
                                loading={loading}
                                headStyle={cardColorStyle('#615460', 'white')}
                                bodyStyle={cardColorStyle('#615460', '#1C1C2A')}
                                bordered={false} style={{ width: 300 }}
                            >
                                <p className="financeNumbers">{formattedSavingsTotal}</p>
                            </Card>
                        </Row>

                        <h1 className='subHeading'>Task</h1>
                        <Row gutter={16}>
                            <Card
                                hoverable
                                title={
                                    <Space>
                                        <ProfileOutlined />
                                        Your Tasks
                                    </Space>
                                }
                                className="dashboardTaskCard"
                                loading={loading}
                                activeTabKey
                                bodyStyle={cardColorStyle('#CC6DCA', '#fff')}
                                headStyle={cardColorStyle('#CC6DCA', '#fff')}
                                bordered={false}
                                style={{ width: 300 }}
                            >

                                {tasks.length > 0 ? (
                                    tasks.slice(0, 3).map(task => (
                                        <p key={task.id}>
                                            • {task.taskInfo.split(' ').slice(0, 10).join(' ')}
                                            {task.taskInfo.split(' ').length > 10 ? '...' : ''}
                                        </p>
                                    ))
                                ) : (
                                    <p>You do not have any tasks.</p>
                                )}


                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Link to={"/task"} style={{ textAlign: 'center', color: 'white', textDecoration: 'underline' }}>
                                        View More Tasks
                                    </Link>
                                </div>
                            </Card>
                        </Row>
                    </Content>
                    <Footernav />
                </Layout>
            </Layout>
        </div>
    );
}

export default Dashboard;