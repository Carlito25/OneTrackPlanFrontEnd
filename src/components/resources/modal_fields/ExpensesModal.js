import { Input, Form, DatePicker, InputNumber } from 'antd';
import moment from 'moment';

function ExpensesModal({
    expensesFormData,
    setExpensesFormData,
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
                        value={expensesFormData.date ? moment(expensesFormData.date) : null}
                        onChange={(date, dateString) =>
                            setExpensesFormData({
                                ...expensesFormData,
                                date: dateString,
                            })
                        }
                    />
                </Form.Item>
                <Form.Item
                    label="Expenses"

                >
                    <Input
                        placeholder="Electricty, Internet, Grocery, etc."
                        value={expensesFormData.expenses}
                        onChange={(event) =>
                            setExpensesFormData({
                                ...expensesFormData,
                                expenses: event.target.value,
                            })
                        }
                    />
                </Form.Item>
                <Form.Item
                    label="Amount"
                >
                    <InputNumber
                        placeholder="Enter the amount"
                        style={{ width: 150 }}
                        formatter={(value) => `₱ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        value={expensesFormData.amount}
                        onChange={(number) =>
                            setExpensesFormData({
                                ...expensesFormData,
                                amount: number,
                            })
                        }
                    />
                </Form.Item>
            </Form>
        </div>
    );
}

export default ExpensesModal;
