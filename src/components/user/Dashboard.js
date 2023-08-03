import { Card, Select, Layout, Row, Space, Col, Divider } from "antd";
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
    CalendarOutlined,
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

    const [draftContent, setDraftContent] = useState(0);
    const [scheduledContent, setScheduledContent] = useState(0);
    const [percentage, setPercentage] = useState(0);

    const [userFormData, setUserFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [usersName, setUsersName] = useState("");
    const userId = localStorage.getItem('user_id');

    const incomeTotalLink = `http://localhost:8000/api/incomeMonthlyTotal/user_id/${userId}`;
    const expensesMonthlyTotalLink = `http://localhost:8000/api/expensesMonthlyTotal/user_id/${userId}`;

    const expensesWeeklyTotalLink = `http://localhost:8000/api/expensesWeeklyTotal/user_id/${userId}`;
    const incomeWeeklyTotalLink = `http://localhost:8000/api/incomeWeeklyTotal/user_id/${userId}`;

    const expensesDailyTotalLink = `http://localhost:8000/api/expensesDailyTotal/user_id/${userId}`;
    const incomeDailyTotalLink = `http://localhost:8000/api/incomeDailyTotal/user_id/${userId}`;

    const taskLink = `http://localhost:8000/api/task/user_id/${userId}`;

    const draftContentLink = `http://localhost:8000/api/contentDraft/user_id/${userId}`;
    const scheduledContentLink = `http://localhost:8000/api/contentScheduled/user_id/${userId}`;

    const userLink = "http://localhost:8000/api/user";

    const fetchUser = async (id) => {
        axios
            .get(userLink + "/" + id)
            .then(function (response) {
                setUsersName(response.data.name);
            })
    }

    // const onPanelChange = (value) => {
    //     console.log(value.format('YYYY-MM-DD'));
    // };

    const handleChange = (value) => {
        setSelectedValue(value);
    };
    const fetchTask = async () => {
        axios
            .get(taskLink)
            .then(function (response) {
                setLoading(false);
                setTasks(response.data);
            })

    }

    const fetchDraftContent = async () => {
        axios
            .get(draftContentLink)
            .then(function (response) {
                setLoading(false);
                setDraftContent(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const fetchScheduledContent = async () => {
        axios
            .get(scheduledContentLink)
            .then(function (response) {
                setLoading(false);
                setScheduledContent(response.data);
            })
            .catch(function (error) {
                console.log(error);
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

    const getPercentage = () => {
        const savings = incomeTotal - expensesTotal
        const percentage = (savings / incomeTotal) * 100;
        return setPercentage(Math.floor(percentage));
    }

    useEffect(() => {
        fetchIncomeTotal();
        fetchExpensesTotal();
        fetchWeeklyExpensesTotal();
        fetchWeeklyIncomeTotal();
        fetchDailyIncomeTotal();
        fetchDailyExpensesTotal();
        fetchTask();
        fetchDraftContent();
        fetchScheduledContent();
        fetchUser(localStorage.getItem('user_id'));
        getSavingsTotal();
        getPercentage();
    }, [draftContent, scheduledContent, incomeTotal, expensesTotal, selectedValue, usersName]);

    const CustomArrowIcon = () => <CaretDownOutlined style={{ color: 'white' }} />;

    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Navbar />
                    <Content className='content'>
                        <Row>
                            <Col span={18}>
                                <Card
                                    hoverable
                                    className="custom-card"
                                    loading={loading}
                                    activeTabKey
                                    bodyStyle={cardColorStyle('#CC6DCA', '#fff')}
                                    headStyle={cardColorStyle('#CC6DCA', '#fff')}
                                    bordered={false}
                                    style={{ width: '100%', marginRight: 10 }}
                                >
                                    <h1 style={{ fontSize: 20 }}>Hello  { usersName}!</h1>

                                    <p style={{ fontSize: 15 }}><b>Important Update:</b> Your saved <b>{percentage}%</b> of your income for the last <b>30 days</b>. Take control and boost your savings. Every bit counts and watch your wealth grow!!</p>
                                </Card>
                            </Col>
                        </Row>

                        <Divider style={{ border: '1px solid #615460' }} />

                        <Row>
                            <Col span={24}>
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
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                                        bordered={false}
                                    >
                                        <p className="financeNumbers">
                                            {selectedValue === 'Weekly' && formattedIncomeWeeklyTotal}
                                            {selectedValue === 'Monthly' && formattedIncomeTotal}
                                            {selectedValue === 'Daily' && formattedIncomeDailyTotal}
                                        </p>
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                                            <Link to={"/income"} style={{ textAlign: 'center', color: 'white', textDecoration: 'underline' }}>
                                                View Income Details
                                            </Link>
                                        </div>
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
                                        bordered={false}
                                    >
                                        <p className="financeNumbers">
                                            {selectedValue === 'Weekly' && formattedExpensesWeeklyTotal}
                                            {selectedValue === 'Monthly' && formattedExpensesTotal}
                                            {selectedValue === 'Daily' && formattedExpensesDailyTotal}
                                        </p>
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, marginBottom: 10 }}>
                                            <Link to={"/expenses"} style={{ textAlign: 'center', color: 'white', textDecoration: 'underline' }}>
                                                View Expenses Details
                                            </Link>
                                        </div>
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
                                        bordered={false}
                                    >
                                        <p className="financeNumbers">{formattedSavingsTotal}</p>

                                    </Card>
                                </div>

                                <Divider style={{ border: '1px solid #615460' }} />

                                {/* <h1 className='subHeading'>Task</h1> */}
                                <Row gutter={16}>
                                    <Col span={12}>
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
                                            style={{ width: '100%' }}
                                        >

                                            {tasks.length > 0 ? (
                                                tasks.slice(0, 3).map(task => (
                                                    <p key={task.id}>
                                                        <b>
                                                            • {task.taskInfo.split(' ').slice(0, 10).join(' ')}
                                                            {task.taskInfo.split(' ').length > 10 ? '...' : ''}
                                                        </b>
                                                        {task.taskDescription ? ` - ${task.taskDescription.split(' ').slice(0, 20).join(' ')}` : ''}
                                                        {task.taskDescription && task.taskDescription.split(' ').length > 10 ? '...' : ''}
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
                                    </Col>
                                    <Col span={12}>
                                        <Card
                                            hoverable
                                            title={
                                                <Space>
                                                    <CalendarOutlined />
                                                    Content
                                                </Space>
                                            }
                                            className="dashboardTaskCard"
                                            activeTabKey
                                            bodyStyle={cardColorStyle('#615460', '#fff')}
                                            headStyle={cardColorStyle('#615460', '#fff')}
                                            bordered={false}
                                            style={{ width: '100%' }}
                                            loading={loading}
                                        >
                                            <Row style={{ display: 'flex', justifyContent: 'center' }}>

                                                <Card
                                                    loading={loading}
                                                    style={{ width: 100, }}
                                                    bodyStyle={cardColorStyle('#fadb14', 'black')}
                                                    bordered={false}
                                                    className="contentInnerCards"

                                                >
                                                    <h1 style={{ display: 'flex', justifyContent: 'center' }}> Draft </h1>
                                                    <p
                                                        style={{ display: 'flex', justifyContent: 'center' }}
                                                        className="contentNumbers"
                                                    >{draftContent}</p>
                                                </Card>

                                                <Card
                                                    loading={loading}
                                                    className="contentInnerCards"
                                                    style={{ width: 100, }}
                                                    bodyStyle={cardColorStyle('#1890ff', '#fff')}
                                                    bordered={false}
                                                >
                                                    <h1 style={{ display: 'flex', justifyContent: 'center' }}> Scheduled </h1>
                                                    <p
                                                        style={{ display: 'flex', justifyContent: 'center', }}
                                                        className="contentNumbers"
                                                    >{scheduledContent}</p>
                                                </Card>

                                            </Row>
                                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                                                <Link to={"/contentplanner"} style={{ textAlign: 'center', color: 'white', textDecoration: 'underline' }}>
                                                    View Content Planner
                                                </Link>
                                            </div>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                            {/* <Col span={6} style={{ marginTop: 0, padding: 20 }}>
                                <div>
                                    <Calendar
                                        fullscreen={false}
                                        onPanelChange={onPanelChange}
                                        className="dashboardCalendar"

                                    />
                                </div>
                            </Col> */}
                        </Row>

                    </Content>
                    <Footernav />
                </Layout>
            </Layout>
        </div>
    );
}

export default Dashboard;