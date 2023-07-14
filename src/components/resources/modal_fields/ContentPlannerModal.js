import { Input, Form, DatePicker, Row, Select, Col } from 'antd';
import moment from 'moment';

const { TextArea } = Input;


function ContentPlannerModal({
    contentFormData,
    setContentFormData,
    modalTitle
}) {

    return (
        <>
            <h1>{modalTitle}</h1>
            <Row>
                <Form
                    layout='vertical'
                >
                    <Row>

                        <Col span={12}>
                            <Form.Item
                                label="Date"
                            >
                                <DatePicker
                                    value={contentFormData.date ? moment(contentFormData.date) : null}
                                    onChange={(date, dateString) =>
                                        setContentFormData({
                                            ...contentFormData,
                                            date: dateString,
                                        })
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Category"
                            >
                                <Select
                                    style={{ width: 160 }}
        
                                    value={contentFormData.category}
                                    onChange={(value) =>
                                        setContentFormData({
                                            ...contentFormData,
                                            category:value,
                                        })
                                    }
                                    options={[
                                        { value: 'Video', label: 'Video' },
                                        { value: 'Short Video', label: 'Short Video' },
                                        { value: 'Post', label: 'Post' },
                                        { value: 'Story', label: 'Story' },
                                    ]
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="Description"
                    >
                        <TextArea
                            rows={4}
                            maxLength={1000}

                            style={{ width: '400px' }}
                            // placeholder="Description of content"
                             value={contentFormData.description}
                            onChange={(event) =>
                                setContentFormData({
                                    ...contentFormData,
                                    description: event.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="Status"
                            >
                                <Select
                                    style={{ width: 160 }}
                                    value={contentFormData.status}
                                    onChange={(value) =>
                                        setContentFormData({
                                            ...contentFormData,
                                            status: value,
                                        })
                                    }
                                    options={[
                                        { value: 'Draft', label: 'Draft' },
                                        { value: 'Scheduled', label: 'Scheduled' },
                                        { value: 'Published', label: 'Published' },
                                    ]
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Channels"
                            >
                                <Select
                                    style={{ width: 160 }}
                                    value={contentFormData.channels}
                                    onChange={(value) =>
                                        setContentFormData({
                                            ...contentFormData,
                                            channels: value,
                                        })
                                    }
                                    options={[
                                        { value: 'YouTube', label: 'YouTube' },
                                        { value: 'Facebook', label: 'Facebook' },
                                        { value: 'Website', label: 'Website' },
                                        { value: 'Instagram', label: 'Instagram' },
                                    ]
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="Notes (Optional)"
                    >
                        <Input
                            placeholder="Input your notes"
                            value={contentFormData.notes}
                            onChange={(event) =>
                                setContentFormData({
                                    ...contentFormData,
                                    notes: event.target.value,
                                })
                            }
                        />
                    </Form.Item>
                </Form>
            </Row>
        </>

    );
}

export default ContentPlannerModal;
