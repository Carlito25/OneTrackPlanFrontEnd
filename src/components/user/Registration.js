import { Input, Form, Button } from 'antd';
import React, { useState } from 'react';
import axios from 'axios';



const Registration = () => {
    const [userFormData, setUserFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const apiLink = "http://localhost:8000/api/user";

    const createUser = () => {
        setUserFormData({
            ...userFormData,
            name: "",
            email: "",
            password: "",
        });
    }

    const onSubmit = () => {
        axios
          .post(apiLink, userFormData)
          .then(function (response) {
            console.log(response);
            // Toast.fire({
            //   icon: 'success',
            //   title: response.data.status,
            //   text: response.data.message,
            // });
          })
          .catch(function (error) {
            console.log(error);
          })
      }



    return (
        <div>
            <Form
                layout='vertical'
                onSubmit={onSubmit}
            >
                <Form.Item
                    label="Name"
                >
                    <Input
                        style={{ width: 150 }}
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
                    label="Email"
                >
                    <Input
                        style={{ width: 150 }}
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
                    label="Password"
                >
                    <Input.Password
                        style={{ width: 150 }}
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
                <Form.Item>
                    <Button type="primary" htmlType="submit" onClick={onSubmit}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Registration;
