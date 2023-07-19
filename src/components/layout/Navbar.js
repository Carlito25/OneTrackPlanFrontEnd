import {React, useState, useEffect} from 'react'
import { Layout, theme, Avatar, Row, Col } from 'antd';
import { FaSignOutAlt, FaCaretDown, FaUserCog } from "react-icons/fa"
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
	const {token: { colorBgContainer }} = theme.useToken();
  //const [name, setName] = useState('');

  const apiLink = "http://localhost:8000/api/logout";
  const apiUserLink = 'http://localhost:8000/api/user';
  const name = localStorage.getItem('name');

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get(apiUserLink);
  //       const userName = response.data.name;
  //       setName(userName);
  //     } catch (error) {
  //       console.log('Error fetching user data:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, [apiUserLink]);

  const handleLogout = async () => {
    try {
      await axios.post(apiLink);
      localStorage.removeItem('token');
      console.log("Logout is clicked")
      navigate('/login');
      
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

      const items = [
        {
            key: '1',
            success: true,
            icon: <FaUserCog />,
            label: 'Account Settings',
        },
    
        {
          key: '2',
          danger: true,
          icon: <FaSignOutAlt />,
          label: 'Logout',
          onClick: handleLogout,
        },
      ];

  return (
    <Header style={{ background: "#50424F", color:'white'}}>
         <Row justify="end" gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Dropdown menu={{ items }} >
                    <a style= {{color:'white'}} onClick={(e) => e.preventDefault()}>
                        <Space  className="navbar-settings">
                       { localStorage.getItem('name')}
                            <FaCaretDown />
                        </Space>
                    </a>
                </Dropdown>         
        </Row>

       
    </Header>
  )
}

export default Navbar