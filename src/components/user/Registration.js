import { Input, Form, Button, Row, Col, Image, Typography } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';
import LandingPageNav from '../layout/LandingPageNav';
import Footernav from '../layout/Footer';

const { Title, Text } = Typography;

const Registration = () => {
    const [userFormData, setUserFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();




    const apiLink = "http://localhost:8000/api/user";


    const onSubmit = () => {
        axios
            .post(apiLink, userFormData)
            .then(function (response) {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: response.data.message,
                    text: 'Make sure you remember your email and password!',
                    confirmButtonText: 'Go to Login Page'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login');
                    }
                })

            }

            )
            .catch(function (error) {
                console.log(error);
            })
    }



    return (
        <div>
            <LandingPageNav />
            <Row>
                <Col span={12} className='login'>
                    <Form
                        labelCol={{
                            span: 8,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        autoComplete="off"
                        onSubmit={onSubmit}
                        className='loginCard'
                    >
                        <Title
                            style={{
                                color: 'white',
                                marginBottom: 25,
                                justifyContent: 'center',
                                display: 'flex',
                            }}
                        >Register
                        </Title>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input
                                placeholder="Enter your name"
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
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
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
                            name="password"
                            label="Password"
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
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit" onClick={onSubmit}>
                                Submit
                            </Button>
                        </Form.Item>
                        <Text className='text' style={{ justifyContent: 'center', display: 'flex', }}>
                            Have an account?
                        </Text>
                        <Link to={"/login"}>
                            <a
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                    color: '#00B3B4',
                                    textDecoration: 'underline',
                                    fontWeight: '500'
                                }}
                            > Login here!
                            </a>
                        </Link>
                    </Form>
                </Col>
                <Col className='heroSection' xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Image
                        width={'90%'}
                        src={require('../../image/registerimage.png')}
                        preview={false}
                    />
                </Col>
            </Row>
            <Footernav />
        </div>
    );
};

export default Registration;
