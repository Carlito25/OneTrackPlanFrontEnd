import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const useAuth = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};
const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const isAuth = useAuth();

  const apiLink = "http://localhost:8000/api/login";
  const apiUserLink = "http://localhost:8000/api/user";

  const fetchUser = async () => {
    try {
      const response = await axios.get(apiUserLink);
      localStorage.setItem('name', response.data.name);
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiLink, {
        email,
        password,
      });


      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user_id', response.data.user_id);
      localStorage.setItem('name', response.data.name);
      navigate('/dashboard');

    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          text: 'Make sure your email and password is correct!',
        })
      } else if (error.response && error.response.status === 422) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          text: 'Make sure everything is filled up!!',
        })
      }
    }
  };


  useEffect(() => {
    setIsLoading(false);
    if (isAuth) {
      navigate('/dashboard');
    }
  }, [isAuth, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Row>
        <Col span={12} className='login'>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            className='loginCard'

          >
            <h1
              style={{
                color: 'white',
                marginBottom: 25,
              }}
            >Login</h1>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}

              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}

              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12} className='right-side'>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
