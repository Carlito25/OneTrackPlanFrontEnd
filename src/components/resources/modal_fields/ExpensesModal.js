import { Input, Form, DatePicker } from 'antd';
import moment from 'moment';

function ExpensesModal({

    expensesFormData,
    setExpensesFormData,
}) {
    return (
        <div>
            <h1>Add Expenses</h1>
            <Form
                layout='vertical'
            >
                <Form.Item label="Date">
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
                <Form.Item label="Expenses">
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
                <Form.Item label="Amount">
                <Input
                        placeholder="Enter the amount"
                        value={expensesFormData.amount}
                        onChange={(event) =>
                            setExpensesFormData({
                                ...expensesFormData,
                                amount: event.target.value,
                            })
                        }
                    />
                </Form.Item>
            </Form>
        </div>
    );
}

export default ExpensesModal;
