import { Input, Form, DatePicker } from 'antd';
import moment from 'moment';


function IncomeModal({
    incomeFormData,
    setIncomeFormData,
}) {
    return (
        <div>
            <h1>Add Income</h1>
            <Form
                layout='vertical'
            >
                <Form.Item label="Date">
                    <DatePicker
                        value={incomeFormData.date ? moment(incomeFormData.date) : null}
                        onChange={(date, dateString) =>
                            setIncomeFormData({
                                ...incomeFormData,
                                date: dateString,
                            })
                        }
                    />
                </Form.Item>
                <Form.Item label="Income">
                    <Input
                        placeholder="Projects, Work etc."
                        value={incomeFormData.income}
                        onChange={(event) =>
                            setIncomeFormData({
                                ...incomeFormData,
                                income: event.target.value,
                            })
                        }
                    />
                </Form.Item>
                <Form.Item label="Amount">
                    <Input
                        placeholder="Enter the amount"
                        value={incomeFormData.amount}
                        onChange={(event) =>
                            setIncomeFormData({
                                ...incomeFormData,
                                amount: event.target.value,
                            })
                        }
                    />
                </Form.Item>
            </Form>
        </div>
    );
}

export default IncomeModal;
