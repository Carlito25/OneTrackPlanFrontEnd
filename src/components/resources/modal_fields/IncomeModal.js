import { Input, Form, DatePicker, InputNumber } from 'antd';
import moment from 'moment';



function IncomeModal({
    incomeFormData,
    setIncomeFormData,
    modalTitle
}) {
    return (
        <div>
            <h1>{modalTitle}</h1>
            <Form
                layout='vertical'
            >
                <Form.Item
                    label="Date"
                >
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
                <Form.Item
                    label="Income"
                >
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
                <Form.Item
                    label="Amount"
                >
                    <InputNumber
                        formatter={(value) => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        placeholder="Enter the amount"
                        value={incomeFormData.amount}
                        onChange={(number) =>
                            setIncomeFormData({
                                ...incomeFormData,
                                amount: number,
                            })
                        }
                    />
                </Form.Item>
            </Form>
        </div>
    );
}

export default IncomeModal;
