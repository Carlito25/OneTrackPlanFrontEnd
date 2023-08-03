import { Input, Form, Row } from 'antd';



function AccountModal({
    setUserFormData,
    userFormData,
    modalTitle
}) {

    const onInputChange = (field, value) => {
        setUserFormData({
            ...userFormData,
            [field]: value,
        });
    };

    return (
        <>
            <h1>Under Maintainance</h1>
            {/* <h1>{modalTitle}</h1>
            <Row>
                <Form
                    layout='vertical'
                >
                    <Form.Item
                        //name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Name!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Input Name"
                            value={userFormData.name}
                            onChange={(event) =>
                                setUserFormData({
                                    ...userFormData,
                                    name: event.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                      //  name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Enter your email"
                            value={userFormData.email}
                            onChange={(event) =>
                                setUserFormData({
                                    ...userFormData,
                                    email: event.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                       // name="password"
                        label="Enter your Old Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter your password"
                            value={userFormData.password}
                            onChange={(event) =>
                                setUserFormData({
                                    ...userFormData,
                                    password: event.target.value,
                                })
                            }
                        />
                    </Form.Item> 
                     <Form.Item
                        name="password"
                        label="Enter your New Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter your password"
                            value={userFormData.password}
                            onChange={(password) =>
                                setUserFormData({
                                    ...userFormData,
                                    password: password,
                                })
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The password do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Enter your password"
                            value={userFormData.confirmPassword}
                            onChange={(event) =>
                                onInputChange('confirmPassword', event.target.value)
                            }
                        />
                    </Form.Item> 
                </Form>
            </Row> */}
        </>

    );
}

export default AccountModal;
