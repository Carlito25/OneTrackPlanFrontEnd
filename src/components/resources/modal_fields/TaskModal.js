import { Input, Form, DatePicker } from 'antd';
import moment from 'moment';


function TaskModal({
    taskFormData,
    setTaskFormData,
    modalTitle
}) {
    return (
        <div>
            <h1>{modalTitle}</h1>
            <Form
                layout='vertical'
            >
                <Form.Item
                    label="Task"
                >
                    <Input
                        placeholder="Input your Task"
                       value={taskFormData.taskInfo}
                        onChange={(event) =>
                            setTaskFormData({
                                ...taskFormData,
                                taskInfo: event.target.value,
                            })
                        }
                    />
                </Form.Item>
                <Form.Item
                    label="Task Description (Optional)"
                >
                    <Input
                        placeholder="Input the Task Description"
                       value={taskFormData.taskDescription}
                        onChange={(event) =>
                            setTaskFormData({
                                ...taskFormData,
                                taskDescription: event.target.value,
                            })
                        }
                    />
                </Form.Item>
                <Form.Item
                    label="Due Date"
                >
                    <DatePicker
                       value={taskFormData.date ? moment(taskFormData.date) : null}
                        onChange={(date, dateString) =>
                            setTaskFormData({
                                ...taskFormData,
                                date: dateString,
                            })
                        }
                    />
                </Form.Item>
            </Form>
        </div>
    );
}

export default TaskModal;