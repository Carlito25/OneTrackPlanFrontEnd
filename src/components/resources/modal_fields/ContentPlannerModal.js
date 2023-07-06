import { Input, Form, DatePicker, Row, Select } from 'antd';
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
                    <Form.Item
                        label="Category"
                    >
                        <Select
                            // suffixIcon={<CustomArrowIcon />}
                            // className="financeSelect"
                            style={{ width: 160 }}
                            // value={selectedValue}
                            // onChange={handleChange}
                            placeholder="Select Category"
                            options={[
                                { value: 'video', label: 'Video' },
                                { value: 'shortVideo', label: 'Short Video' },
                                { value: 'post', label: 'Post' },
                                { value: 'story', label: 'Story' },
                            ]
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                    >
                        <TextArea
                            rows={4}
                            maxLength={6}
                           
                            style={{ width: '400px' }}
                            placeholder="Description of content"
                            value={contentFormData.description}
                            onChange={(event) =>
                                setContentFormData({
                                    ...contentFormData,
                                    description: event.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                    >
                        <Select
                            // suffixIcon={<CustomArrowIcon />}
                            // className="financeSelect"
                            style={{ width: 160 }}
                            // value={selectedValue}
                            // onChange={handleChange}
                            placeholder="Select Category"
                            options={[
                                { value: 'draft', label: 'Draft' },
                                { value: 'scheduled', label: 'Scheduled' },
                                { value: 'published', label: 'Published' },
                            ]
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        label="Channels"
                    >
                        <Select
                            // suffixIcon={<CustomArrowIcon />}
                            // className="financeSelect"
                            style={{ width: 160 }}
                            // value={selectedValue}
                            // onChange={handleChange}
                            placeholder="Select Category"
                            options={[
                                { value: 'youtube', label: 'YouTube' },
                                { value: 'facebook', label: 'Facebook' },
                                { value: 'website', label: 'Website' },
                                { value: 'instagram', label: 'Instagram' },
                            ]
                            }
                        />
                    </Form.Item>
                    <Form.Item
                    label="Notes"
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
