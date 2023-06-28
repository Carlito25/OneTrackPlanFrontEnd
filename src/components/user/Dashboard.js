import { Card, Select, Layout, Row, Space, Typography } from "antd";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
//import { Link } from "react-router-dom";

import {
    ExportOutlined,
    ImportOutlined,
    MoneyCollectOutlined
} from "@ant-design/icons";


const { Content } = Layout;
const { Text, Link } = Typography;
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

    const handleChange = (value) => {
        setSelectedValue(value);
    };

    const incomeTotalLink = 'http://localhost:8000/api/incomeMonthlyTotal/';
    const expensesMonthlyTotalLink = 'http://localhost:8000/api/expensesMonthlyTotal';

    const expensesWeeklyTotalLink = 'http://localhost:8000/api/expensesWeeklyTotal';
    const incomeWeeklyTotalLink = 'http://localhost:8000/api/incomeWeeklyTotal';

    const expensesDailyTotalLink = 'http://localhost:8000/api/expensesDailyTotal';
    const incomeDailyTotalLink = 'http://localhost:8000/api/incomeDailyTotal';


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



    const headStyle = (backgroundColor, textColor) => {
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
    }, []);

    useEffect(() => {
        getSavingsTotal();
    }, [incomeTotal, expensesTotal, selectedValue])

    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar />
                <Layout>
                    <Navbar />
                    <Content className='content'>
                        <h1>Dashboard</h1>
                        <Select
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
                                headStyle={headStyle('#1890ff', '#fff')}
                                actions={[
                            
                                ]}
                            >
                                <p>
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
                                headStyle={headStyle('#CA3900', '#fff')}
                                actions={[
                                    
                                ]}
                            >
                                <p>
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
                                headStyle={headStyle('green', '#fff')}
                                actions={[
                                  
                                ]}
                            >
                                <p>{formattedSavingsTotal}</p>

                            </Card>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default Dashboard;